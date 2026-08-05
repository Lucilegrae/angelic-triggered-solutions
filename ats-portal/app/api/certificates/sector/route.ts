import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: certificates } = await supabase
    .from("certificates")
    .select("*");

  // Group by sector
  const grouped: any = {};
  certificates.forEach((c: any) => {
    if (!grouped[c.sector]) grouped[c.sector] = [];
    grouped[c.sector].push(c);
  });

  return NextResponse.json({
    status: "ok",
    grouped,
    total: certificates.length,
  });
}
