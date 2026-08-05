"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function TierLoadChart({ data }: { data: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels: data.map((t) => `Tier ${t.tier} · P${t.priority}`),
        datasets: [
          {
            label: "Members",
            data: data.map((t) => t.member_count),
            backgroundColor: "rgba(16, 185, 129, 0.5)", // emerald
            borderColor: "rgba(16, 185, 129, 1)",
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
      <h3 className="text-sm font-semibold mb-2">Tier Load Chart</h3>
      <canvas ref={canvasRef} />
    </div>
  );
}
