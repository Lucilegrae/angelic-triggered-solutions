"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type TierLoadChartProps = {
  data?: any[];
};

export default function TierLoadChart({ data = [] }: TierLoadChartProps) {
  const safeData = Array.isArray(data)
    ? data.map((t) => ({
        tier: t?.tier ?? "Unknown",
        load: Number(t?.load ?? 0),
      }))
    : [];

  return (
    <div className="w-full h-64 bg-slate-900/40 border border-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">
        Tier Load Distribution
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={safeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="tier"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "#e2e8f0" }}
            itemStyle={{ color: "#38bdf8" }}
          />
          <Bar dataKey="load" fill="#38bdf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
