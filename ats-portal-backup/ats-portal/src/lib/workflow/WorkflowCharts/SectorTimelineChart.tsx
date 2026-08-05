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

export function SectorTimelineChart({ data }: { data: any[] }) {
  const allDays = Array.from(
    new Set(
      data.flatMap((s) => s.days.map((d: any) => d.day))
    )
  ).sort();

  const colors = [
    "#06b6d4", "#10b981", "#f43f5e", "#f59e0b",
    "#6366f1", "#8b5cf6", "#ec4899", "#14b8a6"
  ];

  const datasets = data.map((sector: any, idx: number) => ({
    label: sector.sector_id,
    data: allDays.map((day) => {
      const entry = sector.days.find((d: any) => d.day === day);
      return entry ? entry.count : 0;
    }),
    borderColor: colors[idx % colors.length],
    backgroundColor: colors[idx % colors.length],
  }));

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-blue-500/40">
      <div className="text-blue-300 font-bold text-xl mb-4">
        Sector Workflow Timelines (Last 30 Days)
      </div>
      <Line
        data={{
          labels: allDays,
          datasets,
        }}
      />
    </div>
  );
}
