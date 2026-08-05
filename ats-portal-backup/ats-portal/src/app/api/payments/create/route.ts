import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function POST(req: Request) {
  const supabase = supabaseServer;
  const body = await req.json();

  const { data, error } = await supabase
    .from("payments")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
