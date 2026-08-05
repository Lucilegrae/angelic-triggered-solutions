import { NextRequest, NextResponse } from "next/server";
import { runCosmicAllocation } from "@/utils/ats/cosmicAllocationEngine";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result = runCosmicAllocation({
    ministryId: body.ministryId,
    sectorId: body.sectorId,
    blockId: body.blockId,
    capacity: body.capacity,
    pressureIndex: body.pressureIndex,
    gnssOrbitalPhase: body.gnssOrbitalPhase ?? 0.5,
    astralPressure: body.astralPressure ?? 0,
    temporalLatticeStability: body.temporalLatticeStability ?? 1,
  });

  return NextResponse.json(result);
}
