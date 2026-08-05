"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Severity badge
function SeverityBadge({ severity }) {
  const color =
    severity === "low"
      ? "bg-green-700"
      : severity === "medium"
      ? "bg-yellow-700"
      : "bg-red-700";

  return (
    <span className={`${color} px-3 py-1 rounded text-slate-200 text-sm`}>
      {severity.toUpperCase()}
    </span>
  );
}

// Bar chart
function BarChart({ labels, values, color = "bg-red-500" }) {
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

export default function TreasuryStress() {
  const [stress, setStress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStress() {
      const { data, error } = await supabase.rpc("ledger_treasury_stress_test");

      if (error) console.error("Treasury Stress RPC error:", error);

      setStress(data || null);
      setLoading(false);
    }

    loadStress();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Running Treasury Stress Test…</div>;
  }

  if (!stress) {
    return <div className="p-6 text-slate-200">No stress test data available.</div>;
  }

  const scenarioLabels = stress.scenarios.map((s) => s.name);
  const scenarioValues = stress.scenarios.map((s) => s.impact_score);

  const moduleLabels = stress.module_impact.map((m) => m.module_name);
  const moduleValues = stress.module_impact.map((m) => m.impact_score);

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">ATS Treasury Stress Test</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Stress Severity</h2>
          <SeverityBadge severity={stress.severity} />
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Stress‑Adjusted Runway</h2>
          <p className="text-3xl mt-2">{stress.runway_months} months</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Liquidity Shock Loss</h2>
          <p className="text-3xl mt-2">{stress.liquidity_loss_usd} USD</p>
        </div>

      </div>

      {/* Scenarios */}
      <h2 className="text-xl font-bold mb-2">Stress Scenarios</h2>
      <BarChart labels={scenarioLabels} values={scenarioValues} color="bg-red-500" />

      {/* Module Impact */}
      <h2 className="text-xl font-bold mt-6 mb-2">Module Impact</h2>
      <BarChart labels={moduleLabels} values={moduleValues} color="bg-purple-500" />

      {/* Notes */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold mb-2">Stress Notes</h2>
        <p className="text-slate-400">{stress.notes}</p>
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
