"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function CosmicChart({ labels, data, title }) {
  return (
    <div className="cosmic-chart">
      <h2 className="text-xl mb-4 text-blue-300 drop-shadow-[0_0_8px_rgba(0,120,255,0.7)]">
        {title}
      </h2>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: title,
              data,
              borderColor: "rgba(59,130,246,0.8)",
              backgroundColor: "rgba(59,130,246,0.3)",
              tension: 0.4,
              pointRadius: 4,
              pointHoverRadius: 8,
              pointBackgroundColor: "rgba(59,130,246,1)",
              pointHoverBackgroundColor: "rgba(255,255,255,1)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { labels: { color: "#93c5fd" } },
          },
          scales: {
            x: { ticks: { color: "#93c5fd" }, grid: { color: "rgba(59,130,246,0.2)" } },
            y: { ticks: { color: "#93c5fd" }, grid: { color: "rgba(59,130,246,0.2)" } },
          },
        }}
      />
    </div>
  );
}
