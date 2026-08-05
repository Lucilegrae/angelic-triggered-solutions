import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function POST(req, { params }) {
  const supabase = supabaseServer;
  const body = await req.json();

  const { data, error } = await supabase
    .from("members")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
