"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

function BarChart({ labels, values }) {
  return (
    <div className="bg-slate-800 p-4 rounded">
      <ul className="space-y-2">
        {values.map((v, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-40 text-slate-300">{labels[i]}</span>
            <div className="flex-1 bg-slate-700 h-3 rounded">
              <div
                className="bg-yellow-500 h-3 rounded"
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

export default function MinerAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      const { data, error } = await supabase.rpc("miner_analytics");

      if (error) console.error("Miner Analytics RPC error:", error);

      setAnalytics(data || null);
      setLoading(false);
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Miner Analytics…</div>;
  }

  if (!analytics) {
    return <div className="p-6 text-slate-200">No analytics available.</div>;
  }

  const minerLabels = analytics.miner_output.map((m) => m.name);
  const minerValues = analytics.miner_output.map((m) => m.total_kg);

  const coordinatorLabels = analytics.coordinator_output.map((c) => c.name);
  const coordinatorValues = analytics.coordinator_output.map((c) => c.total_kg);

  const siteLabels = analytics.site_output.map((s) => s.site_name);
  const siteValues = analytics.site_output.map((s) => s.total_kg);

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-6">Miner Analytics Dashboard</h1>

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
          <h2 className="text-lg font-semibold">Active Miners</h2>
          <p className="text-3xl mt-2">{analytics.miner_count}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">Miner Output</h2>
      <BarChart labels={minerLabels} values={minerValues} />

      <h2 className="text-xl font-bold mt-6 mb-2">Coordinator Output</h2>
      <BarChart labels={coordinatorLabels} values={coordinatorValues} />

      <h2 className="text-xl font-bold mt-6 mb-2">Mining Site Contribution</h2>
      <BarChart labels={siteLabels} values={siteValues} />
    </div>
  );
}
