import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Total QR generated
  const { data: generated } = await supabase
    .from("qr_registry")
    .select("*");

  // Total verification events
  const { data: audits } = await supabase
    .from("verification_audit_trail")
    .select("*");

  // Compute analytics
  const totalGenerated = generated?.length || 0;
  const totalVerified = audits?.filter(a => a.event === "verified").length || 0;
  const totalFailed = audits?.filter(a => a.event === "failed").length || 0;

  const successRate = totalVerified === 0
    ? 0
    : Math.round((totalVerified / (totalVerified + totalFailed)) * 100);

  // QR type distribution
  const typeCounts: any = {};
  generated?.forEach(g => {
    typeCounts[g.qr_type] = (typeCounts[g.qr_type] || 0) + 1;
  });

  // Daily verification activity
  const daily: any = {};
  audits?.forEach(a => {
    const day = a.created_at.split("T")[0];
    daily[day] = (daily[day] || 0) + 1;
  });

  return NextResponse.json({
    totalGenerated,
    totalVerified,
    totalFailed,
    successRate,
    typeCounts,
    dailyActivity: daily,
  });
}
