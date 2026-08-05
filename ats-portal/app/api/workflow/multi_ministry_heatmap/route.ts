import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("ats_multi_ministry_heatmap");

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  return NextResponse.json({ ok: true, heatmap: data });
}
