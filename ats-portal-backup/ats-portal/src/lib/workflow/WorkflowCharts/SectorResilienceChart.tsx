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

export function SectorResilienceChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((s) => s.sector_id),
    datasets: [
      {
        label: "Resilience Score",
        data: data.map((s) => s.resilience_score),
        backgroundColor: "#4ade80",
        borderColor: "#22c55e",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-green-500/40">
      <div className="text-green-300 font-bold text-xl mb-4">
        Sector Resilience Score
      </div>
      <Bar data={chartData} />
    </div>
  );
}
