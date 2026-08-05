"use client";

import {
  useEstatePressure,
  useRisk,
} from "@/hooks/useMinistry";

import MinistryHeader from "@/components/MinistryHeader";
import EstatePressureCard from "@/components/EstatePressureCard";
import MinistrySectionSkeleton from "@/components/MinistrySectionSkeleton";

import EstatePressureChart from "@/components/charts/EstatePressureChart";
import RiskPieChart from "@/components/charts/RiskPieChart";
import GnssEstateMap from "@/components/GnssEstateMap";
import EstateOccupancyHeatmap from "@/components/EstateOccupancyHeatmap";

export default function EstatePressureIntelligence() {
  const token = "";
  const { data: estates } = useEstatePressure(token);
  const { data: risks } = useRisk(token);

  const loading = !estates || !risks;

  const highRiskEstates =
    risks?.filter((r: any) => r.risk_level === "High Risk") || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <MinistryHeader />
        <h1 className="text-sm font-semibold text-slate-300">
          Estate Pressure Intelligence
        </h1>
      </div>

      {loading && (
        <>
          <MinistrySectionSkeleton title="Estate Pressure" />
          <MinistrySectionSkeleton title="Risk Distribution" />
          <MinistrySectionSkeleton title="Estate Map" />
        </>
      )}

      {!loading && (
        <>
          {/* Estate Pressure Cards */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Estate Pressure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {estates.map((e: any, idx: number) => (
                <EstatePressureCard key={idx} {...e} />
              ))}
            </div>
          </section>

          {/* Estate Pressure Chart */}
          <section className="space-y-3">
            <EstatePressureChart data={estates} />
          </section>

          {/* Occupancy Heatmap */}
          <section className="space-y-3">
            <EstateOccupancyHeatmap estates={estates} />
          </section>

          {/* Risk Distribution for Estates */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Estate Risk Distribution</h2>
            <RiskPieChart data={risks} />
            <p className="text-xs text-slate-400">
              High‑risk estates tracked: {highRiskEstates.length}
            </p>
          </section>

          {/* GNSS Estate Map */}
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">GNSS Estate Map</h2>
            <GnssEstateMap estates={estates} />
          </section>
        </>
      )}
    </div>
  );
}
