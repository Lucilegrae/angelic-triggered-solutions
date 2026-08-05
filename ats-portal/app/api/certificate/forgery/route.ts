import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { certificate_id, authority } = body;

  if (!certificate_id || !authority) {
    return NextResponse.json({
      status: "error",
      message: "certificate_id and authority are required",
    });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Load certificate
  const { data: cert } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", certificate_id)
    .single();

  if (!cert) {
    return NextResponse.json({
      status: "error",
      message: "Certificate not found",
    });
  }

  // -----------------------------
  // FORGERY DETECTION ENGINE
  // -----------------------------
  let score = 0;
  const reasons: string[] = [];

  // 1. Check metadata completeness (10 pts)
  const fields = ["name", "sector", "issued_at", "serial"];
  const complete = fields.every(f => cert[f]);
  if (!complete) {
    score += 10;
    reasons.push("Metadata incomplete");
  }

  // 2. Check certificate hash integrity (40 pts)
  const expectedHash = crypto
    .createHash("sha256")
    .update(
      `${cert.name}|${cert.sector}|${cert.serial}|${cert.issued_at}`
    )
    .digest("hex");

  if (cert.certificate_hash !== expectedHash) {
    score += 40;
    reasons.push("Certificate hash mismatch (possible tampering)");
  }

  // 3. Check QR registry presence (20 pts)
  const { data: registry } = await supabase
    .from("qr_registry")
    .select("*")
    .eq("qr_id", certificate_id)
    .single();

  if (!registry) {
    score += 20;
    reasons.push("QR registry entry missing");
  }

  // 4. Check seal tier consistency (20 pts)
  if (cert.golden_star !== true && cert.seal_tier === "golden_star") {
    score += 20;
    reasons.push("Seal tier inconsistent with certificate metadata");
  }

  // Determine forged status
  const forged = score >= 40;

  // Update certificate
  await supabase
    .from("certificates")
    .update({
      forged,
      forgery_score: score,
      forgery_reason: reasons.join("; "),
      forgery_timestamp: new Date().toISOString(),
      forgery_detected_by: authority,
    })
    .eq("id", certificate_id);

  // Log forgery event
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/certificate/forgery/log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      certificate_id,
      forged,
      score,
      reasons,
      authority,
    }),
  });

  return NextResponse.json({
    status: forged ? "forged" : "clean",
    certificate_id,
    score,
    reasons,
  });
}
