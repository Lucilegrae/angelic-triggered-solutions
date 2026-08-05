import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { unit_code, block_name, location, max_families } = body;

  if (!unit_code || !block_name || !location || !max_families) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("units")
    .insert({
      id: crypto.randomUUID(),
      unit_code,
      block_name,
      location,
      max_families,
      current_families: 0,
      is_full: false,
      unit_status: "available",
      engine: "ATS Cosmic Allocation Engine",
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, unit: data });
}
