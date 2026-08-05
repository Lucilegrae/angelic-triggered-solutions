import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { certificate_id } = body;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Load certificate record
  const { data: cert } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", certificate_id)
    .single();

  if (!cert) {
    return NextResponse.json({
      score: 0,
      rating: "Invalid",
      reasons: ["Certificate not found"],
    });
  }

  // 2. Load audit trail
  const { data: audits } = await supabase
    .from("verification_audit_trail")
    .select("*")
    .eq("qr_id", certificate_id);

  // 3. Load registry entry
  const { data: registry } = await supabase
    .from("qr_registry")
    .select("*")
    .eq("qr_id", certificate_id)
    .single();

  // -----------------------------
  // SCORING ENGINE
  // -----------------------------
  let score = 0;
  const reasons: string[] = [];

  // Registry presence (20 pts)
  if (registry) {
    score += 20;
  } else {
    reasons.push("QR registry entry missing");
  }

  // Audit trail activity (20 pts)
  if (audits && audits.length > 0) {
    score += 20;
  } else {
    reasons.push("No verification history");
  }

  // Golden Star seal (20 pts)
  if (cert.golden_star === true) {
    score += 20;
  } else {
    reasons.push("Golden Star seal not present");
  }

  // Metadata completeness (20 pts)
  const fields = ["name", "sector", "issued_at", "serial"];
  const complete = fields.every(f => cert[f]);
  if (complete) {
    score += 20;
  } else {
    reasons.push("Certificate metadata incomplete");
  }

  // Issue date freshness (10 pts)
  const issued = new Date(cert.issued_at);
  const ageDays = (Date.now() - issued.getTime()) / (1000 * 60 * 60 * 24);
  if (ageDays < 365) {
    score += 10;
  } else {
    reasons.push("Certificate older than 1 year");
  }

  // Verification success history (10 pts)
  const verifiedCount = audits?.filter(a => a.event === "verified").length || 0;
  if (verifiedCount > 0) {
    score += 10;
  } else {
    reasons.push("No successful verification events");
  }

  // Rating
  let rating = "Poor";
  if (score >= 80) rating = "Excellent";
  else if (score >= 60) rating = "Good";
  else if (score >= 40) rating = "Fair";

  return NextResponse.json({
    score,
    rating,
    reasons,
    certificate: cert,
  });
}
