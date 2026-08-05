"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Score badge
function ScoreBadge({ score }) {
  const color =
    score >= 80 ? "bg-green-700" :
    score >= 50 ? "bg-yellow-700" :
    "bg-red-700";

  return (
    <span className={`${color} px-3 py-1 rounded text-slate-200 text-sm`}>
      {score}
    </span>
  );
}

export default function LedgerHealth() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHealth() {
      const { data, error } = await supabase.rpc("ledger_financial_health");

      if (error) console.error("Ledger Health RPC error:", error);

      setHealth(data || null);
      setLoading(false);
    }

    loadHealth();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Computing Financial Health…</div>;
  }

  if (!health) {
    return <div className="p-6 text-slate-200">No financial health data available.</div>;
  }

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">ATS Financial Health Score</h1>

      {/* Global Score */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Global Score</h2>
        <ScoreBadge score={health.global_score} />
        <p className="text-slate-400 mt-2">{health.global_status}</p>
        <p className="text-slate-500 mt-1">Trend: {health.trend_direction}</p>
      </div>

      {/* Module Scores */}
      <h2 className="text-xl font-semibold mb-2">Module Scores</h2>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        {health.module_scores.map((m, idx) => (
          <div key={idx} className="flex justify-between py-1 text-slate-300">
            <span>{m.module_name}</span>
            <ScoreBadge score={m.score} />
          </div>
        ))}
      </div>

      {/* Risk Flags */}
      <h2 className="text-xl font-semibold mb-2">Risk Flags</h2>
      <div className="space-y-4">
        {health.risk_flags.length === 0 && (
          <p className="text-slate-400">No risks detected.</p>
        )}

        {health.risk_flags.map((r, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <h3 className="text-lg font-semibold">{r.flag}</h3>
            <p className="text-slate-400 mt-1">{r.description}</p>
            <p className="text-slate-500 mt-1">Severity: {r.severity}</p>
          </div>
        ))}
      </div>

      {/* Back */}
      <a
        href="/portal/ledger"
        className="inline-block text-blue-400 hover:text-blue-300 mt-6"
      >
        Back to Ledger Registry →
      </a>
    </div>
  );
}
