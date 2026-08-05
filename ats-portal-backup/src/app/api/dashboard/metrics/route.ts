import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function GET() {
  const supabase = supabaseServer;

  const { data, error } = await supabase.rpc("get_dashboard_metrics");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
