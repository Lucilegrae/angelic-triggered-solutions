import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = supabaseServer;

  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("name", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
