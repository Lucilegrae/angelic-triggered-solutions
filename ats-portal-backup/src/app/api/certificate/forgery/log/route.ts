import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const { certificate_id, forged, score, reasons, authority } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await supabase.from("verification_audit_trail").insert([
    {
      qr_id: certificate_id,
      qr_type: "certificate",
      event: forged ? "forgery_detected" : "forgery_check_passed",
      payload: { score, reasons, authority },
      ip_address: req.headers.get("x-forwarded-for") || "unknown",
      user_agent: req.headers.get("user-agent") || "unknown",
    },
  ]);

  return NextResponse.json({ status: "logged" });
}
