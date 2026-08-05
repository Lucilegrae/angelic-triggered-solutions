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

  // Load certificate
  const { data: cert } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", certificate_id)
    .single();

  if (!cert) {
    return NextResponse.json({
      tier: "none",
      score: 0,
      message: "Certificate not found",
    });
  }

  // Load audit trail
  const { data: audits } = await supabase
    .from("verification_audit_trail")
    .select("*")
    .eq("qr_id", certificate_id);

  // Load authenticity score
  const authRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/certificate/authenticity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ certificate_id }),
  });

  const auth = await authRes.json();

  // -----------------------------
  // SEAL SCORING ENGINE
  // -----------------------------
  let score = auth.score;

  // Bonus for multiple verifications
  const verifiedCount = audits?.filter(a => a.event === "verified").length || 0;
  if (verifiedCount >= 3) score += 5;
  if (verifiedCount >= 10) score += 10;

  // Bonus for Golden Star flag
  if (cert.golden_star === true) score += 15;

  // Cap score at 100
  if (score > 100) score = 100;

  // Determine tier
  let tier = "bronze";
  if (score >= 60) tier = "silver";
  if (score >= 80) tier = "gold";
  if (score >= 95) tier = "golden_star";

  // Seal message
  const messages: any = {
    bronze: "Basic Authenticity Verified",
    silver: "Strong Authenticity Verified",
    gold: "High Authenticity Verified",
    golden_star: "ATS Golden Star — Supreme Authenticity",
  };

  return NextResponse.json({
    tier,
    score,
    message: messages[tier],
  });
}
