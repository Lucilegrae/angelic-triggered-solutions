"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LifecycleTimelineChart({ data }: { data: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!data || !canvasRef.current) return;

    const months = data.map((l) => l.allocation_clock_start?.slice(0, 7));
    const remaining = data.map((l) => l.months_remaining);

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Months Remaining",
            data: remaining,
            borderColor: "rgba(16, 185, 129, 1)",
            backgroundColor: "rgba(16, 185, 129, 0.3)",
            tension: 0.3,
          },
        ],
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">Allocation Lifecycle Timeline</h3>
      <canvas ref={canvasRef} />
    </div>
  );
}
