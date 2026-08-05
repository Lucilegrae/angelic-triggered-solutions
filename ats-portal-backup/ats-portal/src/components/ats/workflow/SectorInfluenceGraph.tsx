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

export default function SectorInfluenceGraph({ sectors }: { sectors: any[] }) {
  const labels = sectors.map((s) => s.sector_id);
  const scores = sectors.map((s) => s.influence_score);

  const data = {
    labels,
    datasets: [
      {
        label: "Influence Score",
        data: scores,
        backgroundColor: "#FFD700",
        borderColor: "#facc15",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🌟 Sector Influence Graph</h3>
      <Bar data={data} />
    </div>
  );
}
