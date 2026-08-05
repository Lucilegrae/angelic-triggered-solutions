import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const member_id = searchParams.get("member_id");

  if (!member_id) {
    return NextResponse.json(
      { ok: false, error: "member_id is required" },
      { status: 400 }
    );
  }

  const { data: member, error: memberError } = await supabase
    .from("housing_members")
    .select("*")
    .eq("id", member_id)
    .single();

  if (memberError || !member) {
    return NextResponse.json(
      { ok: false, error: "Member not found" },
      { status: 404 }
    );
  }

  const { data: block } = await supabase
    .from("housing_blocks")
    .select("*")
    .eq("member_id", member_id)
    .maybeSingle();

  const { data: unit } = await supabase
    .from("housing_units")
    .select("*")
    .eq("member_id", member_id)
    .maybeSingle();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("member_id", member_id)
    .maybeSingle();

  const { data: bank } = await supabase
    .from("bank_assessments")
    .select("*")
    .eq("member_id", member_id)
    .maybeSingle();

  const { data: allocation } = await supabase
    .from("housing_allocations")
    .select("*")
    .eq("member_id", member_id)
    .maybeSingle();

  return NextResponse.json({
    ok: true,
    member,
    block,
    unit,
    subscription,
    bank,
    allocation,
  });
}
