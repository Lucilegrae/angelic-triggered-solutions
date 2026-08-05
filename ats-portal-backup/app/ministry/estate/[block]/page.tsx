"use client";

import { useEstatePressure, useMinistryCoverage, useRisk } from "@/hooks/useMinistry";
import GnssEstateMap from "@/components/GnssEstateMap";
import EstateOccupancyHeatmap from "@/components/EstateOccupancyHeatmap";
import RiskPieChart from "@/components/charts/RiskPieChart";
import EstatePressureChart from "@/components/charts/EstatePressureChart";
import { useRiskPrediction } from "@/hooks/useRiskPrediction";
import EstateAllocationFlowChart from "@/components/charts/EstateAllocationFlowChart";
import LifecycleClock from "@/components/LifecycleClock";

export default function EstateIntelPage({ params }: { params: { block: string } }) {
  const token = "";
  const { data: estates } = useEstatePressure(token);
  const { data: coverage } = useMinistryCoverage(token);
  const { data: risks } = useRisk(token);

  const estate = estates?.find(
    (e: any) => e.block_name === decodeURIComponent(params.block)
  );

  if (!estate || !coverage || !risks) return <div>Loading estate…</div>;

  const members = coverage.filter((m: any) => m.block_name === estate.block_name);
  const estateRisks = risks.filter((r: any) => r.block_name === estate.block_name);

  // ⭐ Allocation flow (mock or Supabase-driven)
  const flow = estate?.flow || [
    { date: "2024-01", inflow: 3, outflow: 1 },
    { date: "2024-02", inflow: 5, outflow: 2 },
    { date: "2024-03", inflow: 2, outflow: 4 },
    { date: "2024-04", inflow: 6, outflow: 1 },
  ];

  // ⭐ Risk prediction engine
  const { result, loading, predict } = useRiskPrediction();
  const payload = {
    total_units: estate.total_units,
    occupied_slots: estate.occupied_slots,
    risk_cluster: estateRisks.length,
    pressure_ratio: estate.occupied_slots / estate.total_capacity,
    flow_velocity: flow.reduce((acc, f) => acc + (f.inflow + f.outflow), 0),
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Estate Intelligence · {estate.block_name}
      </h1>
      <p className="text-sm text-slate-400">{estate.location}</p>

      {/* ⭐ Estate KPIs */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="border border-emerald-500/40 rounded-lg px-3 py-2 bg-slate-900/40">
          <p className="text-slate-400">Total Units</p>
          <p className="text-emerald-300 text-sm font-semibold">{estate.total_units}</p>
        </div>
        <div className="border border-blue-500/40 rounded-lg px-3 py-2 bg-slate-900/40">
          <p className="text-slate-400">Occupied</p>
          <p className="text-blue-300 text-sm font-semibold">{estate.occupied_slots}</p>
        </div>
        <div className="border border-amber-500/40 rounded-lg px-3 py-2 bg-slate-900/40">
          <p className="text-slate-400">Capacity</p>
          <p className="text-amber-300 text-sm font-semibold">{estate.total_capacity}</p>
        </div>
        <div className="border border-red-500/40 rounded-lg px-3 py-2 bg-slate-900/40">
          <p className="text-slate-400">Pressure</p>
          <p className="text-red-300 text-sm font-semibold">
            {((estate.occupied_slots / estate.total_capacity) * 100).toFixed(0)}%
          </p>
        </div>
      </section>

      {/* ⭐ Occupancy Heatmap */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Occupancy Heatmap</h2>
        <EstateOccupancyHeatmap estates={[estate]} />
      </section>

      {/* ⭐ Estate Pressure Trend */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Pressure Trend</h2>
        <EstatePressureChart data={[estate]} />
      </section>

      {/* ⭐ Risk Distribution */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Risk Distribution</h2>
        <RiskPieChart data={estateRisks} />
        <p className="text-xs text-slate-400">
          High‑risk members: {estateRisks.filter((r: any) => r.risk_level === "High Risk").length}
        </p>
      </section>

      {/* ⭐ Allocation Flow */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Allocation Flow</h2>
        <EstateAllocationFlowChart flow={flow} />
        <p className="text-xs text-slate-400">
          Movement velocity: {flow.reduce((acc, f) => acc + (f.inflow + f.outflow), 0)} total moves
        </p>
      </section>

      {/* ⭐ GNSS Map */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">GNSS Estate Map</h2>
        <GnssEstateMap estates={[estate]} />
      </section>

      {/* ⭐ Member List */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Members in Estate</h2>
        <ul className="text-xs space-y-1">
          {members.map((m: any, idx: number) => (
            <li key={idx} className="border border-slate-800 rounded-lg px-3 py-2 bg-slate-900/40">
              {m.full_name} · Tier {m.tier} · {m.insurance_status}
            </li>
          ))}
        </ul>
      </section>

      {/* ⭐ Predictive Occupancy */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Predictive Occupancy (ES256‑signed)</h2>
        <button
          onClick={() => predict(payload)}
          className="mt-1 text-xs px-3 py-1 rounded border border-red-500/40 text-red-300 hover:bg-red-500/10"
        >
          {loading ? "Predicting…" : "Run Occupancy Prediction"}
        </button>

      {/* ⭐ Lifecycle Clock */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Lifecycle Clock</h2>

        <LifecycleClock
          start={estate.allocation_clock_start || "2024-01-01"}
          deadline={estate.allocation_deadline || "2024-12-31"}
          monthsRemaining={estate.months_remaining || 6}
        />

        <p className="text-xs text-slate-400">
          Allocation progress: {estate.months_remaining} months remaining
        </p>
      </section>

        {result && (
          <div className="mt-3 text-xs border border-red-500/40 rounded-lg p-3 bg-slate-900/40">
            <p>Score: {result.prediction.score}</p>
            <p>Band: {result.prediction.band}</p>
          </div>
        )}
      </section>
    </div>
  );
}
