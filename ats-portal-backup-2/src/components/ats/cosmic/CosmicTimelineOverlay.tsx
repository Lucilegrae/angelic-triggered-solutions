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

type OverlayProps = {
  workflowTimeline: any[];
  cosmicTimeline: any[];
};

export default function CosmicTimelineOverlay({ workflowTimeline, cosmicTimeline }: OverlayProps) {
  const days = Array.from(
    new Set([
      ...workflowTimeline.flatMap((t: any) => t.days.map((d: any) => d.day)),
      ...cosmicTimeline.map((c: any) => c.day),
    ])
  ).sort();

  const workflowCounts = days.map((day) => {
    const total = workflowTimeline.reduce((acc: number, sector: any) => {
      const entry = sector.days.find((d: any) => d.day === day);
      return acc + (entry ? entry.count : 0);
    }, 0);
    return total;
  });

  const cosmicIntensity = days.map((day) => {
    const entry = cosmicTimeline.find((c: any) => c.day === day);
    return entry ? entry.intensity : 0;
  });

  const data = {
    labels: days,
    datasets: [
      {
        label: "Workflow Volume",
        data: workflowCounts,
        borderColor: "#06b6d4",
        backgroundColor: "#06b6d4",
        tension: 0.3,
        yAxisID: "y",
      },
      {
        label: "Cosmic Intensity",
        data: cosmicIntensity,
        borderColor: "#ec4899",
        backgroundColor: "#ec4899",
        tension: 0.3,
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🌌 Cosmic Timeline Overlay</h3>

      <Line
        data={data}
        options={{
          responsive: true,
          scales: {
            y: {
              type: "linear",
              position: "left",
            },
            y1: {
              type: "linear",
              position: "right",
              grid: { drawOnChartArea: false },
            },
          },
        }}
      />
    </div>
  );
}
