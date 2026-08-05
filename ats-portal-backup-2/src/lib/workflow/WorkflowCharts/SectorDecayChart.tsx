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

export function SectorDecayChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((s) => s.sector_id),
    datasets: [
      {
        label: "Avg Decay Pressure",
        data: data.map((s) => s.avg_decay),
        backgroundColor: "#f43f5e",
        borderColor: "#e11d48",
        borderWidth: 2,
      },
      {
        label: "Max Decay Pressure",
        data: data.map((s) => s.max_decay),
        backgroundColor: "#f59e0b",
        borderColor: "#d97706",
        borderWidth: 2,
      }
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-rose-500/40">
      <div className="text-rose-300 font-bold text-xl mb-4">
        Sector Workflow Decay Model
      </div>
      <Bar data={chartData} />
    </div>
  );
}
