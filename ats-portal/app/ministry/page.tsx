"use client";

import { Suspense, useMemo } from "react";
import dynamic from "next/dynamic";

// Components in src/components
const GnssEstateMap = dynamic(() => import("@/components/GnssEstateMap"), { ssr: false });
const EstateOccupancyHeatmap = dynamic(() => import("@/components/EstateOccupancyHeatmap"), { ssr: false });
const FederationConsole = dynamic(() => import("@/components/FederationConsole"), { ssr: false });
const TierLoadChart = dynamic(() => import("@/components/TierLoadChart"), { ssr: false });
const EstatePressureChart = dynamic(() => import("@/components/EstatePressureChart"), { ssr: false });
const RiskPieChart = dynamic(() => import("@/components/RiskPieChart"), { ssr: false });
const LifecycleTimelineChart = dynamic(() => import("@/components/LifecycleTimelineChart"), { ssr: false });
const ChartSkeleton = dynamic(() => import("@/components/ChartSkeleton"), { ssr: false });
const FederationHistoryPanel = dynamic(() => import("@/components/FederationHistoryPanel"), { ssr: false });

// Hooks
import { useGnssWorker } from "@/hooks/useGnssWorker";
import { useFederationPredict } from "@/hooks/useFederationPredict";

// Safe defaults
const safeArray = (v: any) => (Array.isArray(v) ? v : []);

export default function MinistryHome() {
  // Dummy placeholders until real data is wired
  const coverage: any[] = [];
  const tiers: any[] = [];
  const estates: any[] = [];
  const risks: any[] = [];
  const lifecycle: any[] = [];
  const filters: any = {};

  // Memoized filters
  const filteredCoverage = useMemo(() => safeArray(coverage), [coverage, filters]);
  const filteredTiers = useMemo(() => safeArray(tiers), [tiers, filters]);
  const filteredEstates = useMemo(() => safeArray(estates), [estates, filters]);
  const filteredRisks = useMemo(() => safeArray(risks), [risks, filters]);
  const filteredLifecycle = useMemo(() => safeArray(lifecycle), [lifecycle, filters]);

  const processedGnss = useGnssWorker(filteredEstates);
  const { data: predict } = useFederationPredict();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8 space-y-10">
      <h1 className="text-2xl font-bold">ATS Ministry Federation</h1>
      <p className="text-slate-400">
        GNSS intelligence · Estate analytics · Risk clusters · Federation history · Predictive engine
      </p>

      {/* Tier Load Chart */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Tier Load Chart</h2>
        <Suspense fallback={<ChartSkeleton title="Loading Tier Load..." />}>
          <TierLoadChart data={filteredTiers} />
        </Suspense>
      </section>

      {/* Estate Pressure */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Estate Pressure</h2>
        <Suspense fallback={<ChartSkeleton title="Loading Estate Pressure..." />}>
          <EstatePressureChart data={filteredEstates} />
        </Suspense>
      </section>

      {/* Risk Pie */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Risk Distribution</h2>
        <Suspense fallback={<ChartSkeleton title="Loading Risk Chart..." />}>
          <RiskPieChart data={filteredRisks} />
        </Suspense>
      </section>

      {/* Lifecycle Timeline */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Lifecycle Timeline</h2>
        <Suspense fallback={<ChartSkeleton title="Loading Lifecycle Timeline..." />}>
          <LifecycleTimelineChart data={filteredLifecycle} />
        </Suspense>
      </section>

      {/* Occupancy Heatmap */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Estate Occupancy Heatmap</h2>
        <Suspense fallback={<ChartSkeleton title="Loading Occupancy Heatmap..." />}>
          <EstateOccupancyHeatmap estates={processedGnss} />
        </Suspense>
      </section>

      {/* GNSS Estate Map */}
      <section>
        <h2 className="text-xl font-semibold mb-2">GNSS Estate Map</h2>
        <Suspense fallback={<ChartSkeleton title="Loading GNSS Map..." />}>
          <GnssEstateMap estates={processedGnss} />
        </Suspense>
      </section>

      {/* Federation Console */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Federation Console</h2>
        <Suspense fallback={<ChartSkeleton title="Loading Federation Console..." />}>
          <FederationConsole />
        </Suspense>
      </section>

      {/* Federation History */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Federation History</h2>
        <Suspense fallback={<ChartSkeleton title="Loading Federation History..." />}>
          <FederationHistoryPanel />
        </Suspense>
      </section>

      {/* Predictive Federation Engine */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Predictive Federation Engine</h2>

        {predict && (
          <div className="border border-amber-500/40 bg-amber-900/20 rounded-lg p-4 space-y-3">
            <div className="text-xs text-amber-200">
              High Risk: {predict.signals.highRiskCount} · Overdue Allocations: {predict.signals.overdueAllocations}
            </div>

            <ul className="space-y-2 text-xs text-amber-100">
              {predict.recommendations.map((r: any, idx: number) => (
                <li key={idx} className="border border-amber-500/40 rounded px-3 py-2 bg-amber-950/40">
                  <p className="font-semibold">{r.action}</p>
                  <p className="text-amber-200">{r.reason}</p>
                  <p className="text-[10px] uppercase tracking-wide text-amber-300">
                    Priority: {r.priority}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
