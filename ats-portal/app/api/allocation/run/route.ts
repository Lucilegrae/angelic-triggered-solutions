import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { runAllocationEngine } from "@/utils/ats/allocationEngine";
import { logAllocationHistory } from "@/utils/ats/allocationHistoryLogger";
import { logAllocationSummary } from "@/utils/ats/allocationSummaryLogger";
import { computeBlockDistribution } from "@/utils/ats/computeBlockDistribution";

export async function POST(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    // Fetch members
    const { data: rawMembers } = await supabase
      .from("ats_members")
      .select("id, full_name, policy_number");

    const members = rawMembers.map(m => ({
      id: m.id,
      name: m.full_name,
      policy_number: m.policy_number,
    }));

    // Fetch units
    const { data: rawUnits } = await supabase
      .from("units")
      .select("id, unit_code, block_name, max_families, current_families");

    const units = rawUnits.map(u => ({
      id: u.id,
      block: u.block_name,
      unit_number: u.unit_code,
      max_families: u.max_families,
      current_families: u.current_families,
    }));

    // Derive blocks
    const blocks = units.map(u => ({
      block: u.block,
      max_units: u.max_families,
      current_units: u.current_families,
    }));

    // Run allocation engine
    const allocation = runAllocationEngine(members, units, blocks);

    // Compute block distribution
    const block_distribution = computeBlockDistribution(allocation, units);

    // Log history
    await logAllocationHistory(allocation);

    // Log summary including block_distribution
    await logAllocationSummary(allocation, units, block_distribution);

    return NextResponse.json({
      ok: true,
      allocation,
      block_distribution,
    });

  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
