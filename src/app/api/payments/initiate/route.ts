import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { ins_uuid, sector, amount, currency = "ZWL", provider } = body;

    if (!ins_uuid || !sector || !amount || !provider) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: payment, error } = await supabase
      .from("ats_payments")
      .insert({
        ins_uuid,
        sector,
        amount,
        currency,
        provider,
        status: "pending"
      })
      .select("*")
      .single();

    if (error) {
      console.error("Payment insert error:", error.message);
      return NextResponse.json(
        { error: "Failed to create payment" },
        { status: 500 }
      );
    }

    // Call external provider (EcoCash, etc.)
    const providerRes = await fetch(
      `${process.env.ATS_PAYMENT_PROVIDER_BASE_URL}/initiate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payment_id: payment.id,
          amount,
          currency,
          ins_uuid,
          sector,
          callback_url: `${process.env.ATS_API_BASE_URL}/api/payments/callback`
        })
      }
    );

    if (!providerRes.ok) {
      console.error("Provider initiation failed:", await providerRes.text());
      return NextResponse.json(
        { error: "Provider initiation failed" },
        { status: 502 }
      );
    }

    const providerData = await providerRes.json();

    await supabase
      .from("ats_payments")
      .update({
        provider_ref: providerData.reference,
        status: "initiated",
        updated_at: new Date().toISOString()
      })
      .eq("id", payment.id);

    return NextResponse.json({ payment, provider: providerData }, { status: 200 });
  } catch (e: any) {
    console.error("Payment initiation error:", e.message);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
