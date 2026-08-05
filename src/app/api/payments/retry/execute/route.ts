import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(_req: NextRequest) {
  const now = new Date().toISOString();
  const limit = Number(process.env.ATS_PAYMENT_RETRY_LIMIT || "5");

  const { data: retries, error } = await supabase
    .from("ats_payment_retries")
    .select("*")
    .lte("next_attempt_at", now)
    .eq("status", "queued");

  if (error) {
    console.error("Retry fetch error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch retries" },
      { status: 500 }
    );
  }

  for (const retry of retries || []) {
    const { data: payment, error: pErr } = await supabase
      .from("ats_payments")
      .select("*")
      .eq("id", retry.payment_id)
      .single();

    if (pErr || !payment) {
      console.error("Payment not found for retry:", retry.payment_id);
      continue;
    }

    if (retry.attempt >= limit) {
      await supabase
        .from("ats_payment_retries")
        .update({ status: "failed" })
        .eq("id", retry.id);
      continue;
    }

    const providerRes = await fetch(
      `${process.env.ATS_PAYMENT_PROVIDER_BASE_URL}/status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: payment.id,
          provider_ref: payment.provider_ref
        })
      }
    );

    if (!providerRes.ok) {
      console.error("Provider status check failed:", await providerRes.text());
    } else {
      const providerData = await providerRes.json();
      await supabase
        .from("ats_payments")
        .update({
          status: providerData.status,
          updated_at: new Date().toISOString()
        })
        .eq("id", payment.id);
    }

    const interval =
      Number(process.env.ATS_PAYMENT_RETRY_INTERVAL_SECONDS || "300");

    await supabase
      .from("ats_payment_retries")
      .update({
        attempt: retry.attempt + 1,
        last_attempt_at: new Date().toISOString(),
        next_attempt_at: new Date(
          Date.now() + interval * 1000
        ).toISOString()
      })
      .eq("id", retry.id);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
