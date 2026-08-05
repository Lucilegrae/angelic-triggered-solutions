import { NextRequest, NextResponse } from "next/server";
import { buildCosmicReplay } from "@/utils/ats/cosmicReplayEngine";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const replay = buildCosmicReplay(body.events ?? []);
  return NextResponse.json({ replay });
}
