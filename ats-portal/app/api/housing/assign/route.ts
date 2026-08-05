import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { member_id, block_code, unit_type, value_benchmark } = body;

    if (!member_id || !block_code || !unit_type) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
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

    const { data: block, error: blockError } = await supabase
      .from("housing_blocks")
      .insert({
        member_id,
        block_code,
      })
      .select("*")
      .single();

    if (blockError) {
      return NextResponse.json(
        { ok: false, error: blockError.message },
        { status: 500 }
      );
    }

    const { data: unit, error: unitError } = await supabase
      .from("housing_units")
      .insert({
        member_id,
        unit_type,
        value_benchmark,
      })
      .select("*")
      .single();

    if (unitError) {
      return NextResponse.json(
        { ok: false, error: unitError.message },
        { status: 500 }
      );
    }

    const { error: updateError } = await supabase
      .from("housing_members")
      .update({
        status: "BLOCK_UNIT_ASSIGNED",
        value_benchmark,
      })
      .eq("id", member_id);

    if (updateError) {
      return NextResponse.json(
        { ok: false, error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        block,
        unit,
      },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message ?? "Unexpected error" },
      { status: 500 }
    );
  }
}
