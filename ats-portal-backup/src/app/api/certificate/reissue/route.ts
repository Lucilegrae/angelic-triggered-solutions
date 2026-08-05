import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const { old_certificate_id, authority } = body;

  if (!old_certificate_id || !authority) {
    return NextResponse.json({
      status: "error",
      message: "old_certificate_id and authority are required",
    });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Load old certificate
  const { data: oldCert } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", old_certificate_id)
    .single();

  if (!oldCert) {
    return NextResponse.json({
      status: "error",
      message: "Old certificate not found",
    });
  }

  // Create new certificate ID
  const newId = randomUUID();

  // Create new certificate record
  const { error: createError } = await supabase
    .from("certificates")
    .insert([
      {
        id: newId,
        name: oldCert.name,
        sector: oldCert.sector,
        serial: oldCert.serial,
        issued_at: new Date().toISOString(),
        certificate_path: oldCert.certificate_path,
        golden_star: oldCert.golden_star,
        reissued: true,
        reissued_from: old_certificate_id,
        reissued_timestamp: new Date().toISOString(),
        reissued_authority: authority,
      },
    ]);

  if (createError) {
    return NextResponse.json({ status: "error", error: createError });
  }

  // Mark old certificate as revoked automatically
  await supabase
    .from("certificates")
    .update({
      revoked: true,
      revocation_reason: "Re‑issued",
      revocation_timestamp: new Date().toISOString(),
      revocation_authority: authority,
    })
    .eq("id", old_certificate_id);

  // Log re‑issuance event
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/certificate/reissue/log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      old_certificate_id,
      new_certificate_id: newId,
      authority,
    }),
  });

  return NextResponse.json({
    status: "reissued",
    old_certificate_id,
    new_certificate_id: newId,
    authority,
  });
}
