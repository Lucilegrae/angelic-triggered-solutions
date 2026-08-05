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

export default function WorkflowTimelineRenderer({ timeline }: { timeline: any[] }) {
  const allDays = Array.from(
    new Set(
      timeline.flatMap((t) => t.days.map((d: any) => d.day))
    )
  ).sort();

  const colors = [
    "#06b6d4", "#10b981", "#f43f5e", "#f59e0b",
    "#6366f1", "#8b5cf6", "#ec4899", "#14b8a6"
  ];

  const datasets = timeline.map((sector: any, idx: number) => ({
    label: sector.sector_id,
    data: allDays.map((day) => {
      const entry = sector.days.find((d: any) => d.day === day);
      return entry ? entry.count : 0;
    }),
    borderColor: colors[idx % colors.length],
    backgroundColor: colors[idx % colors.length],
    tension: 0.3,
  }));

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">📈 Workflow Timeline (Last 30 Days)</h3>

      <Line
        data={{
          labels: allDays,
          datasets,
        }}
      />
    </div>
  );
}
