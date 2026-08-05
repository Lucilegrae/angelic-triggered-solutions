import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { member_id, tier, priority } = body;

  if (!member_id || !tier || !priority) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("ats_ministry_tier_load")
    .insert({
      id: crypto.randomUUID(),
      member_id,
      tier,
      priority,
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

  return NextResponse.json({ ok: true, tier_assignment: data });
}
