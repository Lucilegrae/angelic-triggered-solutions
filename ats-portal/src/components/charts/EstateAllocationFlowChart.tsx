"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function EstateAllocationFlowChart({ flow }: { flow: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!flow || !canvasRef.current) return;

    const labels = flow.map((f) => f.date);
    const inflow = flow.map((f) => f.inflow);
    const outflow = flow.map((f) => f.outflow);

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Inflow",
            data: inflow,
            backgroundColor: "rgba(16, 185, 129, 0.6)",
          },
          {
            label: "Outflow",
            data: outflow,
            backgroundColor: "rgba(239, 68, 68, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
      },
    });

    return () => chart.destroy();
  }, [flow]);

  return (
    <div className="border border-slate-800 bg-slate-900/40 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">Allocation Flow</h3>
      <canvas ref={canvasRef} />
    </div>
  );
}
