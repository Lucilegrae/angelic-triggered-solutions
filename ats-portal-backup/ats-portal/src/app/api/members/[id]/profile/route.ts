import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function GET(req, { params }) {
  const supabase = supabaseServer;

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
