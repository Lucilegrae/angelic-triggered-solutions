"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type RiskPieChartProps = {
  data?: any[];
};

export default function RiskPieChart({ data = [] }: RiskPieChartProps) {
  const safeData = Array.isArray(data)
    ? data.map((r) => ({
        name: r?.risk_level ?? "Unknown",
        value: Number(r?.count ?? r?.score ?? 0),
      }))
    : [];

  const COLORS = ["#ef4444", "#f59e0b", "#22c55e"]; // high, medium, low

  return (
    <div className="w-full h-64 bg-slate-900/40 border border-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">
        Risk Distribution
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={safeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name }) => name}
          >
            {safeData.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "#e2e8f0" }}
            itemStyle={{ color: "#38bdf8" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
