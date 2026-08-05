"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function SectorSLAChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((s) => s.sector_id),
    datasets: [
      {
        label: "Avg SLA (hrs)",
        data: data.map((s) => s.avg_hours),
        backgroundColor: "#06b6d4",
      },
      {
        label: "Max SLA (hrs)",
        data: data.map((s) => s.max_hours),
        backgroundColor: "#f59e0b",
      },
      {
        label: "Breaches",
        data: data.map((s) => s.breaches),
        backgroundColor: "#f43f5e",
      }
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-red-500/40">
      <div className="text-red-300 font-bold text-xl mb-4">
        Sector SLA Analytics
      </div>
      <Bar data={chartData} />
    </div>
  );
}
