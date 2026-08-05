import { NextRequest, NextResponse } from "next/server";
import { runFederationOrchestration } from "@/lib/federationOrchestrator";

export async function GET(req: NextRequest) {
  const results = await runFederationOrchestration();

  return NextResponse.json({
    ts: new Date().toISOString(),
    mode: "cron",
    results,
  });
}
