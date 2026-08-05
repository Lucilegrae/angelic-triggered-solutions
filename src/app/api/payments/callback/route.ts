import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

function verifySignature(req: NextRequest, rawBody: string) {
  const signature = req.headers.get("x-ats-signature");
  if (!signature) return false;

  const secret = process.env.ATS_PAYMENT_WEBHOOK_SECRET!;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!verifySignature(req, rawBody)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const { payment_id, status } = payload;

  if (!payment_id || !status) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("ats_payments")
    .update({
      status,
      updated_at: new Date().toISOString()
    })
    .eq("id", payment_id);

  if (error) {
    console.error("Payment status update error:", error.message);
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
