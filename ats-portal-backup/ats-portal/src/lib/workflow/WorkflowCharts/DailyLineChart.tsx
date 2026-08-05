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

export function DailyLineChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        label: "Workflows Created",
        data: data.map((d) => d.count),
        borderColor: "#06b6d4",
        backgroundColor: "#06b6d4",
      },
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-4 border border-indigo-500/40">
      <div className="text-indigo-300 font-bold mb-3">Daily Workflow Activity</div>
      <Line data={chartData} />
    </div>
  );
}
