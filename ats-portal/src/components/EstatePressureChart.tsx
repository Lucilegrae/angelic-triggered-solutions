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

type EstatePressureChartProps = {
  data?: any[];
};

export default function EstatePressureChart({ data = [] }: EstatePressureChartProps) {
  const safeData = Array.isArray(data)
    ? data.map((e) => ({
        estate: e?.estate_name ?? e?.block_name ?? "Unknown",
        pressure: Number(e?.pressure_index ?? e?.occupancy_rate ?? 0),
      }))
    : [];

  return (
    <div className="w-full h-64 bg-slate-900/40 border border-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-slate-200 mb-3">
        Estate Pressure Index
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={safeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="estate"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            interval={0}
            angle={-30}
            textAnchor="end"
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
            itemStyle={{ color: "#f97316" }}
          />
          <Bar dataKey="pressure" fill="#f97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
