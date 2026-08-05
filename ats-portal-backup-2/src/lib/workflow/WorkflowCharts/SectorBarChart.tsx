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

export function SectorBarChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((s) => s.sector_id),
    datasets: [
      {
        label: "Workflows",
        data: data.map((s) => s.count),
        backgroundColor: "#f59e0b",
      },
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-4 border border-yellow-500/40">
      <div className="text-yellow-300 font-bold mb-3">Sector Workflow Segmentation</div>
      <Bar data={chartData} />
    </div>
  );
}
