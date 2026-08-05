import { NextResponse } from "next/server";
import { atsHeaders } from "@/lib/atsHeaders";

export async function GET(req, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const base = process.env.ATS_API;

  const [ministry, federation] = await Promise.all([
    fetch(base + "/ministry/summary").then(r => r.json()),
    fetch(base + "/federation/history").then(r => r.json()),
  ]);

  const estates = ministry.estates ?? [];
  const risks = ministry.risks ?? [];
  const lifecycle = ministry.lifecycle ?? [];

  const highRiskCount = risks.filter((r: any) => r.risk_level === "High Risk").length;
  const pressureBlocks = estates.filter((e: any) => e.pressure_score >= 80).map((e: any) => e.block_name);
  const overdueAllocations = lifecycle.filter((l: any) => l.months_remaining <= 0).length;

  const recommendations = [];

  if (highRiskCount > 10) {
    recommendations.push({
      action: "Run Risk Reconciliation",
      reason: "High number of High Risk members detected",
      priority: "High",
    });
  }

  if (pressureBlocks.length > 0) {
    recommendations.push({
      action: "Run Estate Pressure Rebalance",
      reason: `Pressure above threshold in blocks: ${[...new Set(pressureBlocks)].join(", ")}`,
      priority: "Medium",
    });
  }

  if (overdueAllocations > 0) {
    recommendations.push({
      action: "Run Allocation Lifecycle Sweep",
      reason: `${overdueAllocations} allocations are overdue`,
      priority: "High",
    });
  }

  return NextResponse.json({
    signals: {
      highRiskCount,
      pressureBlocks: [...new Set(pressureBlocks)],
      overdueAllocations,
    },
    recommendations,
    lastFederationRun: federation[0]?.ts ?? null,
  });
}
