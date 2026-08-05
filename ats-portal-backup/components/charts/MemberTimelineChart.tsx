"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function MemberTimelineChart({ events }: { events: any[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!events || !canvasRef.current) return;

    const labels = events.map((e) => e.date);
    const statuses = events.map((e) => e.status_label);

    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Status progression",
            data: events.map((e) => e.status_score || 0),
            borderColor: "rgba(16, 185, 129, 1)",
            backgroundColor: "rgba(16, 185, 129, 0.3)",
            tension: 0.3,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => statuses[ctx.dataIndex],
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [events]);

  return (
    <div className="border border-slate-800 bg-slate-900/40 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">Member Timeline</h3>
      <canvas ref={canvasRef} />
    </div>
  );
}
