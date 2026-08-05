"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RiskPieChart({ data }: { data: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const levels = ["High Risk", "Medium Risk", "Low Risk"];
    const counts = levels.map(
      (level) => data.filter((r) => r.risk_level === level).length
    );

    const chart = new Chart(canvasRef.current, {
      type: "pie",
      data: {
        labels: levels,
        datasets: [
          {
            data: counts,
            backgroundColor: [
              "rgba(239, 68, 68, 0.6)", // red
              "rgba(245, 158, 11, 0.6)", // amber
              "rgba(16, 185, 129, 0.6)", // emerald
            ],
          },
        ],
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">Risk Distribution</h3>
      <canvas ref={canvasRef} />
    </div>
  );
}
