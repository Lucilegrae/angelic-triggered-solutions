import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { id, type } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let table = "";
  if (type === "stakeholder") table = "stakeholders";
  if (type === "certificate") table = "certificates";
  if (type === "invitation") table = "invitations";

  if (!table) {
    return NextResponse.json({ status: "error", message: "Unknown type" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  // -----------------------------
  // FAILED VERIFICATION (log audit)
  // -----------------------------
  if (error || !data) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qr_id: id,
        qr_type: type,
        event: "failed",
        payload: { id, type },
      }),
    });

    return NextResponse.json({
      status: "not_found",
      message: "No record found for this QR",
    });
  }

  // -----------------------------
  // REVOKED CERTIFICATE (log audit)
  // -----------------------------
  if (data.revoked === true) {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qr_id: id,
        qr_type: type,
        event: "revoked",
        payload: data,
      }),
    });

    return NextResponse.json({
      status: "revoked",
      message: "This certificate has been revoked",
      reason: data.revocation_reason,
      authority: data.revocation_authority,
      timestamp: data.revocation_timestamp,
    });
  }

  if (data.reissued === true) {
    return NextResponse.json({
      status: "reissued",
      message: "This certificate has been re‑issued",
      new_certificate_id: data.reissued_from,
      timestamp: data.reissued_timestamp,
      authority: data.reissued_authority,
    });
  }

  if (data.forged === true) {
    return NextResponse.json({
      status: "forged",
      message: "Forgery detected",
      score: data.forgery_score,
      reason: data.forgery_reason,
      timestamp: data.forgery_timestamp,
      authority: data.forgery_detected_by,
    });
  }

  // -----------------------------
  // SUCCESSFUL VERIFICATION (log audit)
  // -----------------------------
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/audit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      qr_id: id,
      qr_type: type,
      event: "verified",
      payload: data,
    }),
  });

  return NextResponse.json({
    status: "verified",
    type,
    record: data,
  });
}
