import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data: members, error: membersError } = await supabase
    .from("housing_members")
    .select("*");

  if (membersError) {
    return NextResponse.json(
      { ok: false, error: membersError.message },
      { status: 500 }
    );
  }

  const { count: blocksCount, error: blocksError } = await supabase
    .from("housing_blocks")
    .select("*", { count: "exact", head: true });

  const { count: unitsCount, error: unitsError } = await supabase
    .from("housing_units")
    .select("*", { count: "exact", head: true });

  const { count: allocationsCount, error: allocationsError } = await supabase
    .from("housing_allocations")
    .select("*", { count: "exact", head: true });

  if (blocksError || unitsError || allocationsError) {
    return NextResponse.json(
      {
        ok: false,
        error:
          blocksError?.message ||
          unitsError?.message ||
          allocationsError?.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    members,
    aggregates: {
      total_members: members.length,
      total_blocks: blocksCount ?? 0,
      total_units: unitsCount ?? 0,
      total_allocations: allocationsCount ?? 0,
    },
  });
}
