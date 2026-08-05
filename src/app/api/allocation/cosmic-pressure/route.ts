import { NextRequest, NextResponse } from "next/server";
import { computeCosmicPressure } from "@/utils/ats/cosmicPressureEngine";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const pressure = computeCosmicPressure({
    sectorId: body.sectorId,
    basePressure: body.basePressure,
    astralPressure: body.astralPressure ?? 0,
    gnssOrbitalPhase: body.gnssOrbitalPhase ?? 0.5,
    parallelTimelineCount: body.parallelTimelineCount ?? 1,
  });

  return NextResponse.json({ pressure });
}
