import { NextResponse } from "next/server";
import { supabaseServer } from "@/supabaseServer";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = supabaseServer;
  const body = await req.json();

  const { district, ministry, category } = body;

  const { data, error } = await supabase.rpc("intel_multifilter", {
    district,
    ministry,
    category,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
