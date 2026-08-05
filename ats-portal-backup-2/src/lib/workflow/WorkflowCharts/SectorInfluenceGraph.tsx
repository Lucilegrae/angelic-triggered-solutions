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

export function SectorInfluenceGraph({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((s) => s.sector_id),
    datasets: [
      {
        label: "Influence Score",
        data: data.map((s) => s.influence_score),
        backgroundColor: "#FFD700",
        borderColor: "#facc15",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="rounded-xl bg-black/70 p-6 border border-yellow-500/40">
      <div className="text-yellow-300 font-bold text-xl mb-4">
        Sector Influence Graph
      </div>
      <Bar data={chartData} />
    </div>
  );
}
