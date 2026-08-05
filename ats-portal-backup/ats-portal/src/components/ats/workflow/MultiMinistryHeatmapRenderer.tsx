"use client";

import { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-chart-matrix";

export default function MultiMinistryHeatmapRenderer({ heatmap }: { heatmap: any[] }) {
  const ref = useRef(null);

  const ministries = Array.from(new Set(heatmap.map((h) => h.ministry))).sort();
  const states = Array.from(new Set(heatmap.map((h) => h.state))).sort();

  const matrix = ministries.map((ministry) =>
    states.map((state) => {
      const entry = heatmap.find((h) => h.ministry === ministry && h.state === state);
      return entry ? entry.count : 0;
    })
  );

  useEffect(() => {
    if (!ref.current) return;

    new Chart(ref.current, {
      type: "matrix",
      data: {
        labels: states,
        datasets: ministries.map((ministry, rowIndex) => ({
          label: ministry,
          data: states.map((state, colIndex) => ({
            x: colIndex,
            y: rowIndex,
            v: matrix[rowIndex][colIndex],
          })),
          backgroundColor: (ctx) => {
            const value = ctx.dataset.data[ctx.dataIndex].v;
            const alpha = Math.min(1, value / 10);
            return `rgba(255, 99, 132, ${alpha})`;
          },
          width: 40,
          height: 40,
        })),
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: {
            type: "linear",
            ticks: { callback: (i) => states[i] },
          },
          y: {
            type: "linear",
            ticks: { callback: (i) => ministries[i] },
          },
        },
      },
    });
  }, [heatmap]);

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🔥 Multi‑Ministry Workflow Heatmap</h3>
      <canvas ref={ref}></canvas>
    </div>
  );
}
