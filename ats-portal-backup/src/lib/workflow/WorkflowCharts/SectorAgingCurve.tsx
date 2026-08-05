"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export function SectorAgingCurve({ data }: { data: any[] }) {
  const colors = [
    "#06b6d4", "#10b981", "#f43f5e", "#f59e0b",
    "#6366f1", "#8b5cf6", "#ec4899", "#14b8a6"
  ];

  const datasets = data.map((sector: any, idx: number) => ({
    label: sector.sector_id,
    data: sector.ages,
    borderColor: colors[idx % colors.length],
    backgroundColor: colors[idx % colors.length],
  }));

  const maxLength = Math.max(...data.map((s) => s.ages.length));
  const labels = Array.from({ length: maxLength }, (_, i) => `WF ${i + 1}`);

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-pink-500/40">
      <div className="text-pink-300 font-bold text-xl mb-4">
        Sector Workflow Aging Curves
      </div>
      <Line
        data={{
          labels,
          datasets,
        }}
      />
    </div>
  );
}
