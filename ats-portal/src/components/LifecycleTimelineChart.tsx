"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type LifecycleTimelineChartProps = {
  data?: any[];
};

export default function LifecycleTimelineChart({ data = [] }: LifecycleTimelineChartProps) {
  const safeData = Array.isArray(data)
    ? data.map((l) => ({
        stage: l?.stage ?? l?.lifecycle_stage ?? "Unknown",
        value: Number(l?.value ?? l?.count ?? 0),
      }))
    : [];

  return (
    <div className="w-full h-64 bg-slate-900/40 border border-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">
        Lifecycle Timeline
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={safeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="stage"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "6px",
            }}
            labelStyle={{ color: "#e2e8f0" }}
            itemStyle={{ color: "#38bdf8" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={{ r: 4, fill: "#38bdf8" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
