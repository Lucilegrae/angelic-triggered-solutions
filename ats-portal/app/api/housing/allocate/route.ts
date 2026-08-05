import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { member_id, gnss_district } = body;

  if (!member_id || !gnss_district) {
    return NextResponse.json(
      { ok: false, error: "member_id and gnss_district are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("housing_allocations")
    .insert({
      member_id,
      gnss_district,
      allocation_status: "ALLOCATED",
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  await supabase
    .from("housing_members")
    .update({ status: "ALLOCATED" })
    .eq("id", member_id);

  return NextResponse.json({ ok: true, allocation: data });
}
