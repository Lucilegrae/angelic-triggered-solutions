"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function EstatePressureChart({ data }: { data: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.map((e) => `${e.block_name} · ${e.location}`),
        datasets: [
          {
            label: "Remaining Slots",
            data: data.map((e) => e.remaining_slots),
            backgroundColor: "rgba(59, 130, 246, 0.5)", // blue
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">Estate Pressure Chart</h3>
      <canvas ref={canvasRef} />
    </div>
  );
}
