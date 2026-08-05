import { NextResponse } from "next/server";
import { callRpc } from "@/lib/supabase/rpcClient";
import type { GetTemporalProbabilityLatticeArgs, GetTemporalProbabilityLatticeReturns } from "@/types/supabase/rpc";

export async function GET() {
  try {
    const lattice = await callRpc<
      GetTemporalProbabilityLatticeArgs,
      GetTemporalProbabilityLatticeReturns
    >("get_temporal_probability_lattice", {});
    return NextResponse.json({ ok: true, lattice });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
