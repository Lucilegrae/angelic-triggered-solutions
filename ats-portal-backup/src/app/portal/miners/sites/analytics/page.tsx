"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Simple bar chart renderer
function BarChart({ labels, values, color = "bg-yellow-500" }) {
  return (
    <div className="bg-slate-800 p-4 rounded">
      <ul className="space-y-2">
        {values.map((v, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-40 text-slate-300">{labels[i]}</span>
            <div className="flex-1 bg-slate-700 h-3 rounded">
              <div
                className={`${color} h-3 rounded`}
                style={{ width: `${v}%` }}
              ></div>
            </div>
            <span className="text-slate-400">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MinerSiteAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      const { data, error } = await supabase.rpc("miner_site_analytics");

      if (error) console.error("Miner Site Analytics RPC error:", error);

      setAnalytics(data || null);
      setLoading(false);
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Site Analytics…</div>;
  }

  if (!analytics) {
    return <div className="p-6 text-slate-200">No analytics available.</div>;
  }

  const siteLabels = analytics.site_output.map((s) => s.site_name);
  const siteValues = analytics.site_output.map((s) => s.total_kg);

  const mineralLabels = analytics.mineral_distribution.map((m) => m.mineral_type);
  const mineralValues = analytics.mineral_distribution.map((m) => m.total_kg);

  const minerLabels = analytics.miner_performance.map((m) => m.name);
  const minerValues = analytics.miner_performance.map((m) => m.total_kg);

  const coordinatorLabels = analytics.coordinator_performance.map((c) => c.name);
  const coordinatorValues = analytics.coordinator_performance.map((c) => c.total_kg);

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-6">Mining Site Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Total Output</h2>
          <p className="text-3xl mt-2">{analytics.total_output} kg</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Daily Average</h2>
          <p className="text-3xl mt-2">{analytics.daily_average} kg</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Active Sites</h2>
          <p className="text-3xl mt-2">{analytics.site_count}</p>
        </div>
      </div>

      {/* Site Output */}
      <h2 className="text-xl font-bold mb-2">Site Output</h2>
      <BarChart labels={siteLabels} values={siteValues} color="bg-green-500" />

      {/* Mineral Distribution */}
      <h2 className="text-xl font-bold mt-6 mb-2">Mineral Distribution</h2>
      <BarChart labels={mineralLabels} values={mineralValues} color="bg-blue-500" />

      {/* Miner Performance */}
      <h2 className="text-xl font-bold mt-6 mb-2">Miner Performance</h2>
      <BarChart labels={minerLabels} values={minerValues} color="bg-purple-500" />

      {/* Coordinator Performance */}
      <h2 className="text-xl font-bold mt-6 mb-2">Coordinator Performance</h2>
      <BarChart labels={coordinatorLabels} values={coordinatorValues} color="bg-red-500" />

      {/* Monthly Trend */}
      <h2 className="text-xl font-bold mt-6 mb-2">Monthly Output Trend</h2>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded">
        {analytics.monthly_output.map((m) => (
          <div key={m.month} className="flex justify-between text-slate-300 py-1">
            <span>{m.month}</span>
            <span>{m.total_kg} kg</span>
          </div>
        ))}
      </div>
    </div>
  );
}
