import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { runAllocationEngine } from "@/utils/ats/allocationEngine";
import { logAllocationHistory } from "@/utils/ats/allocationHistoryLogger";

export async function POST() {
  const supabase = await createClient();

  const { data: members, error: membersError } = await supabase
    .from("ats_members")
    .select("id, name, policy_number");

  if (membersError) {
    return NextResponse.json(
      { ok: false, error: membersError.message },
      { status: 500 }
    );
  }

  const { data: units, error: unitsError } = await supabase
    .from("ats_housing_units")
    .select("id, block, unit_number");

  if (unitsError) {
    return NextResponse.json(
      { ok: false, error: unitsError.message },
      { status: 500 }
    );
  }

  const { data: blocks, error: blocksError } = await supabase
    .from("ats_blocks")
    .select("block, max_units, current_units");

  if (blocksError) {
    return NextResponse.json(
      { ok: false, error: blocksError.message },
      { status: 500 }
    );
  }

  const allocation = runAllocationEngine(
    members ?? [],
    units ?? [],
    blocks ?? []
  );

  await logAllocationHistory(allocation);

  return NextResponse.json(
    {
      ok: true,
      allocation,
    },
    { status: 200 }
  );
}
