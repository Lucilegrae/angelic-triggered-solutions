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

export default function WorkflowAgingCurveRenderer({ aging }: { aging: any[] }) {
  const colors = [
    "#06b6d4", "#10b981", "#f43f5e", "#f59e0b",
    "#6366f1", "#8b5cf6", "#ec4899", "#14b8a6"
  ];

  const datasets = aging.map((sector: any, idx: number) => ({
    label: sector.sector_id,
    data: sector.ages,
    borderColor: colors[idx % colors.length],
    backgroundColor: colors[idx % colors.length],
    tension: 0.3,
  }));

  const maxLength = Math.max(...aging.map((s) => s.ages.length));
  const labels = Array.from({ length: maxLength }, (_, i) => `WF ${i + 1}`);

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">⏳ Workflow Aging Curves</h3>

      <Line
        data={{
          labels,
          datasets,
        }}
      />
    </div>
  );
}
