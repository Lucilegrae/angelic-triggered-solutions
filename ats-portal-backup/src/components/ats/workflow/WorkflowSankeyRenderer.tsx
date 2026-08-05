"use client";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
} from "chart.js";
import { SankeyController, Flow } from "chartjs-chart-sankey";
import { Chart } from "react-chartjs-2";

ChartJS.register(SankeyController, Flow, Tooltip, Legend);

export default function WorkflowSankeyRenderer({ transitions }: { transitions: any[] }) {
  const colors: Record<string, string> = {
    DRAFT: "#06b6d4",
    PENDING: "#f59e0b",
    APPROVED: "#10b981",
    REJECTED: "#ef4444",
    OVERRIDDEN: "#8b5cf6",
    FINALIZED: "#6366f1",
  };

  const flows = transitions.map((t: any) => ({
    from: t.from_state,
    to: t.to_state,
    flow: t.count,
  }));

  const data = {
    datasets: [
      {
        label: "Workflow State Transitions",
        data: flows,
        colorFrom: (c: any) => colors[c.from] ?? "#fff",
        colorTo: (c: any) => colors[c.to] ?? "#fff",
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🎀 Workflow State Transition Ribbon</h3>

      <Chart
        type="sankey"
        data={data}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  `${ctx.raw.from} → ${ctx.raw.to}: ${ctx.raw.flow}`,
              },
            },
          },
        }}
      />
    </div>
  );
}
