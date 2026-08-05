import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await supabase.rpc("legitimacy_power_rankings");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rankings: data });
}
