import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase
    .from("mv_risk_clusters")
    .select("*")
    .order("pressure_percent", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, clusters: data });
}
