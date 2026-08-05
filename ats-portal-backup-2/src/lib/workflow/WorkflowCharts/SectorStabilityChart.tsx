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

export function SectorStabilityChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((s) => s.sector_id),
    datasets: [
      {
        label: "Stability Index",
        data: data.map((s) => s.stability_index),
        backgroundColor: "#38bdf8",
        borderColor: "#0ea5e9",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-blue-500/40">
      <div className="text-blue-300 font-bold text-xl mb-4">
        Sector Stability Index
      </div>
      <Bar data={chartData} />
    </div>
  );
}
