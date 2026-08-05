import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";
import type { NextParams } from "@/types/next";

export async function GET(
  const { id } = await params;
  request: Request,
  { params }: NextParams<"id">
) {
  const { id } = await params;
  const supabase = supabaseServer();

  const { data, error } = await supabase.rpc("gnss_profile", { gnss_id: id });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
