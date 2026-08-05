"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function StateDonutChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((s) => s.state),
    datasets: [
      {
        data: data.map((s) => s.count),
        backgroundColor: ["#06b6d4", "#10b981", "#f43f5e", "#f59e0b", "#6366f1"],
      },
    ],
  };

  return (
    <div className="rounded-xl bg-slate-900/70 p-4 border border-cyan-500/40">
      <div className="text-cyan-300 font-bold mb-3">Workflow State Distribution</div>
      <Doughnut data={chartData} />
    </div>
  );
}
