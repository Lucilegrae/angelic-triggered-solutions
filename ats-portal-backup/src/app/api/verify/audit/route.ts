import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const { qr_id, qr_type, event, payload } = body;

  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  const geo = {
    ip,
    userAgent,
  };

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("verification_audit_trail")
    .insert([{ qr_id, qr_type, event, payload, ip_address: ip, user_agent: userAgent, geo }]);

  if (error) {
    return NextResponse.json({ status: "error", error });
  }

  return NextResponse.json({ status: "audit_logged" });
}
