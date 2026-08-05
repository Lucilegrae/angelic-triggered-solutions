import { NextRequest, NextResponse } from "next/server";
import { forecastCosmicAllocation } from "@/utils/ats/cosmicForecastEngine";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const forecast = forecastCosmicAllocation(
    body.currentPressure,
    body.currentUtilization,
    body.steps ?? 12,
  );

  return NextResponse.json({ forecast });
}
