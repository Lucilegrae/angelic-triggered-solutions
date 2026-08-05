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

export function SectorRecoveryChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((s) => s.sector_id),
    datasets: [
      {
        label: "Recovery Score",
        data: data.map((s) => s.recovery_score),
        backgroundColor: "#4ade80",
        borderColor: "#22c55e",
        borderWidth: 2,
      },
      {
        label: "Recovery Acceleration",
        data: data.map((s) => s.recovery_acceleration),
        backgroundColor: "#60a5fa",
        borderColor: "#3b82f6",
        borderWidth: 2,
      }
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-teal-500/40">
      <div className="text-teal-300 font-bold text-xl mb-4">
        Sector Recovery Model
      </div>
      <Bar data={chartData} />
    </div>
  );
}
