import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const supabase = supabaseServer();

  const { data, error } = await supabase.rpc("miner_payout", body);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
