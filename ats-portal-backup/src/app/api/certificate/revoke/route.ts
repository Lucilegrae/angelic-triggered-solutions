import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const { certificate_id, reason, authority } = body;

  if (!certificate_id || !reason || !authority) {
    return NextResponse.json({
      status: "error",
      message: "certificate_id, reason, and authority are required",
    });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // ---------------------------------------
  // UPDATE CERTIFICATE → MARK AS REVOKED
  // ---------------------------------------
  const { error } = await supabase
    .from("certificates")
    .update({
      revoked: true,
      revocation_reason: reason,
      revocation_timestamp: new Date().toISOString(),
      revocation_authority: authority,
    })
    .eq("id", certificate_id);

  if (error) {
    return NextResponse.json({ status: "error", error });
  }

  // ---------------------------------------
  // LOG REVOCATION TO AUDIT TRAIL
  // ---------------------------------------
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/certificate/revoke/log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      certificate_id,
      reason,
      authority,
    }),
  });

  // ---------------------------------------
  // RETURN REVOCATION RESPONSE
  // ---------------------------------------
  return NextResponse.json({
    status: "revoked",
    certificate_id,
    reason,
    authority,
  });
}
