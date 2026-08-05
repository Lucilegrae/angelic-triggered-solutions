import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { id } = await params;
  const supabase = supabaseServer;

  const { data, error } = await supabase.rpc("get_savings_profile", {
    savings_id: id,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
