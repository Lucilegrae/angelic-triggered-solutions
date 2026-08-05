import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { member_id, bank_name } = body;

  if (!member_id || !bank_name) {
    return NextResponse.json(
      { ok: false, error: "member_id and bank_name are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("bank_assessments")
    .insert({
      member_id,
      bank_name,
      eligibility: "PENDING",
      risk_category: "UNKNOWN",
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
    .update({ status: "BANK_ASSESSMENT_PENDING" })
    .eq("id", member_id);

  return NextResponse.json({ ok: true, bank: data });
}
