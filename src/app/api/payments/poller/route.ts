import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function GET(_req: NextRequest) {
  try {
    // Fetch all payments that need polling
    const { data: pending, error } = await supabase
      .from("ats_payments")
      .select("*")
      .in("status", ["pending", "initiated"]);

    if (error) {
      console.error("Poller fetch error:", error.message);
      return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
    }

    const results: any[] = [];

    for (const payment of pending) {
      try {
        // Query PSP provider for latest status
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
          console.error("Provider status error:", await providerRes.text());

          // Queue retry if provider unreachable
          await supabase.from("ats_payment_retries").insert({
            payment_id: payment.id,
            attempt: 0,
            status: "queued",
            next_attempt_at: new Date(
              Date.now() +
                Number(process.env.ATS_PAYMENT_RETRY_INTERVAL_SECONDS || "300") * 1000
            ).toISOString()
          });

          results.push({
            id: payment.id,
            status: "provider_unreachable"
          });

          continue;
        }

        const providerData = await providerRes.json();

        // Update payment status
        await supabase
          .from("ats_payments")
          .update({
            status: providerData.status,
            updated_at: new Date().toISOString()
          })
          .eq("id", payment.id);

        results.push({
          id: payment.id,
          new_status: providerData.status
        });
      } catch (err: any) {
        console.error("Poller internal error:", err.message);
      }
    }

    return NextResponse.json(
      {
        ok: true,
        polled: pending.length,
        results
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Poller fatal error:", e.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
