"use client";

import { useState, useEffect } from "react";

import {
  useMinistryCoverage,
  useTierLoad,
  useEstatePressure,
  useRisk,
  useLifecycle,
} from "@/hooks/useMinistry";

import { useMinistryRealtime } from "@/hooks/useMinistryRealtime";
import { useFederationRealtime } from "@/hooks/useFederationRealtime";

import MinistryHeader from "@/components/MinistryHeader";
import KpiWidget from "@/components/KpiWidget";
import MinistryFilterBar from "@/components/MinistryFilterBar";
import MinistrySectionSkeleton from "@/components/MinistrySectionSkeleton";

import TierLoadCard from "@/components/TierLoadCard";
import EstatePressureCard from "@/components/EstatePressureCard";
import RiskCard from "@/components/RiskCard";
import CoverageTable from "@/components/CoverageTable";

import TierLoadChart from "@/components/charts/TierLoadChart";
import EstatePressureChart from "@/components/charts/EstatePressureChart";
import RiskPieChart from "@/components/charts/RiskPieChart";
import LifecycleTimelineChart from "@/components/charts/LifecycleTimelineChart";

import GnssEstateMap from "@/components/GnssEstateMap";
import EstateOccupancyHeatmap from "@/components/EstateOccupancyHeatmap";
import FederationHistoryPanel from "@/components/FederationHistoryPanel";

export default function MinistryDashboard({ token }: { token: string }) {
  const { data: coverage } = useMinistryCoverage(token);
  const { data: tiers } = useTierLoad(token);
  const { data: estates } = useEstatePressure(token);
  const { data: risks } = useRisk(token);
  const { data: lifecycle } = useLifecycle(token);

  const loading =
    !coverage || !tiers || !estates || !risks || !lifecycle;

  const [filters, setFilters] = useState({
    tier: "",
    risk: "",
    block: "",
    location: "",
  });

  // ⭐ Federation Orchestration Status
  const [orchestrateStatus, setOrchestrateStatus] = useState<string>("");

  async function triggerFederation() {
    setOrchestrateStatus("Running…");
    try {
      const res = await fetch("/federation/orchestrate", {
        method: "POST",
      });
      const json = await res.json();
      setOrchestrateStatus(`Last run: ${json.ts}`);
    } catch (e) {
      setOrchestrateStatus("Error running orchestration");
    }
  }

  // ⭐ REALTIME MINISTRY STREAM
  useMinistryRealtime((payload) => {
    console.log("Realtime ministry update:", payload);
  });

  // ⭐ REALTIME FEDERATION STREAM
  useFederationRealtime((payload) => {
    console.log("Federation event:", payload);
  });

  // ⭐ FILTER LOGIC
  const filteredCoverage = coverage?.filter((c: any) =>
    (!filters.tier || c.tier == filters.tier) &&
    (!filters.risk || c.risk_level == filters.risk) &&
    (!filters.block ||
      c.block_name?.toLowerCase().includes(filters.block.toLowerCase())) &&
    (!filters.location ||
      c.location?.toLowerCase().includes(filters.location.toLowerCase()))
  );

  const filteredTiers = tiers?.filter((t: any) =>
    !filters.tier || t.tier == filters.tier
  );

  const filteredEstates = estates?.filter((e: any) =>
    (!filters.block ||
      e.block_name?.toLowerCase().includes(filters.block.toLowerCase())) &&
    (!filters.location ||
      e.location?.toLowerCase().includes(filters.location.toLowerCase()))
  );

  const filteredRisks = risks?.filter((r: any) =>
    (!filters.tier || r.tier == filters.tier) &&
    (!filters.risk || r.risk_level == filters.risk)
  );

  const filteredLifecycle = lifecycle?.filter((l: any) =>
    !filters.tier || l.tier == filters.tier
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <MinistryHeader />

        <div className="flex items-center gap-2">
          {/* ⭐ Federation Orchestration Button */}
          <button
            onClick={triggerFederation}
            className="text-xs px-3 py-1 rounded border border-sky-500/40 text-sky-300 hover:bg-sky-500/10"
          >
            Run Federation Orchestration
          </button>

          {orchestrateStatus && (
            <span className="text-[11px] text-slate-400">
              {orchestrateStatus}
            </span>
          )}

          {/* ⭐ PDF EXPORT BUTTON */}
          <button
            onClick={() => window.open("/ministry/export", "_blank")}
            className="text-xs px-3 py-1 rounded border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
          >
            Export PDF Summary
          </button>
        </div>
      </div>

      {/* ⭐ KPI WIDGETS */}
      {!loading && (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <KpiWidget label="Total Members" value={coverage.length} />
          <KpiWidget label="Total Estates" value={estates.length} color="blue" />
          <KpiWidget
            label="High Risk"
            value={risks.filter((r: any) => r.risk_level === "High Risk").length}
            color="red"
          />
          <KpiWidget label="Active Allocations" value={lifecycle.length} color="amber" />
        </section>
      )}

      {/* ⭐ FILTER BAR */}
      {!loading && (
        <MinistryFilterBar filters={filters} setFilters={setFilters} />
      )}

      {/* ⭐ SKELETONS */}
      {loading && (
        <>
          <MinistrySectionSkeleton title="Tier Load" />
          <MinistrySectionSkeleton title="Estate Pressure" />
          <MinistrySectionSkeleton title="Compliance & Risk" />
          <MinistrySectionSkeleton title="Coverage Snapshot" />
          <MinistrySectionSkeleton title="Allocation Lifecycle" />
        </>
      )}

      {/* ⭐ MAIN CONTENT */}
      {!loading && (
        <>
          {/* ⭐ Tier Load Cards */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Tier Load</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTiers.map((t: any, idx: number) => (
                <TierLoadCard key={idx} {...t} />
              ))}
            </div>
          </section>

          {/* ⭐ Tier Load Chart */}
          <section className="space-y-3">
            <TierLoadChart data={filteredTiers} />
          </section>

          {/* ⭐ Estate Pressure Cards */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Estate Pressure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredEstates.map((e: any, idx: number) => (
                <EstatePressureCard key={idx} {...e} />
              ))}
            </div>
          </section>

          {/* ⭐ Estate Pressure Chart */}
          <section className="space-y-3">
            <EstatePressureChart data={filteredEstates} />
          </section>

          {/* ⭐ Risk Cards */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Compliance & Risk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredRisks.map((r: any, idx: number) => (
                <RiskCard key={idx} {...r} />
              ))}
            </div>
          </section>

          {/* ⭐ Risk Pie Chart */}
          <section className="space-y-3">
            <RiskPieChart data={filteredRisks} />
          </section>

          {/* ⭐ Coverage Table */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Coverage Snapshot</h2>
            <CoverageTable data={filteredCoverage} />
          </section>

          {/* ⭐ Lifecycle Cards */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Allocation Lifecycle</h2>
            <div className="space-y-2">
              {filteredLifecycle.map((l: any, idx: number) => (
                <div
                  key={idx}
                  className="border border-slate-800 rounded-lg px-3 py-2 bg-slate-900/40"
                >
                  <p className="text-xs text-slate-400">
                    {l.full_name} · {l.unit_code}
                  </p>
                  <p className="text-xs text-slate-500">
                    {l.block_name} · {l.location}
                  </p>
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p>Status: {l.allocation_status}</p>
                      <p>Start: {l.allocation_clock_start}</p>
                    </div>
                    <div>
                      <p>Deadline: {l.allocation_deadline}</p>
                      <p>Months remaining: {l.months_remaining}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ⭐ Lifecycle Timeline Chart */}
          <section className="space-y-3">
            <LifecycleTimelineChart data={filteredLifecycle} />
          </section>

          {/* ⭐ Estate Occupancy Heatmap */}
          <section className="space-y-3">
            <EstateOccupancyHeatmap estates={filteredEstates} />
          </section>

          {/* ⭐ GNSS Estate Map */}
          <section className="space-y-3">
            <GnssEstateMap estates={filteredEstates} />
          </section>

          {/* ⭐ Federation History */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Federation Task History</h2>
            <FederationHistoryPanel />
          </section>
        </>
      )}
    </div>
  );
}
