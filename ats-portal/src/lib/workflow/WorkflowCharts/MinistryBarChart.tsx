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

export function MinistryBarChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((m) => m.ministry_id),
    datasets: [
      {
        label: "Workflows",
        data: data.map((m) => m.count),
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-4 border border-emerald-500/40">
      <div className="text-emerald-300 font-bold mb-3">Ministry Workflow Segmentation</div>
      <Bar data={chartData} />
    </div>
  );
}
