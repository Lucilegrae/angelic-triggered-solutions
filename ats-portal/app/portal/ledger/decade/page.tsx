"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Bar chart
function BarChart({ labels, values, color = "bg-orange-500" }) {
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

export default function LedgerDecade() {
  const [scenario, setScenario] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadScenario() {
      const { data, error } = await supabase.rpc("ledger_decade_scenario");

      if (error) console.error("Ledger Decade Scenario RPC error:", error);

      setScenario(data || null);
      setLoading(false);
    }

    loadScenario();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Generating Decade Scenarios…</div>;
  }

  if (!scenario) {
    return <div className="p-6 text-slate-200">No decade scenario data available.</div>;
  }

  const scenarioLabels = ["Baseline", "Optimistic", "Conservative", "High‑Stress"];
  const scenarioValues = [
    scenario.baseline_usd,
    scenario.optimistic_usd,
    scenario.conservative_usd,
    scenario.high_stress_usd,
  ];

  const moduleLabels = scenario.module_projection.map((m) => m.module_name);
  const moduleValues = scenario.module_projection.map((m) => m.projected_usd);

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">ATS Decade Scenario Engine</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Baseline</h2>
          <p className="text-3xl mt-2">{scenario.baseline_usd} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Optimistic</h2>
          <p className="text-3xl mt-2">{scenario.optimistic_usd} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Conservative</h2>
          <p className="text-3xl mt-2">{scenario.conservative_usd} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">High‑Stress</h2>
          <p className="text-3xl mt-2">{scenario.high_stress_usd} USD</p>
        </div>

      </div>

      {/* Scenario Overview */}
      <h2 className="text-xl font-bold mb-2">Scenario Overview</h2>
      <BarChart labels={scenarioLabels} values={scenarioValues} color="bg-blue-500" />

      {/* Module Projection */}
      <h2 className="text-xl font-bold mt-6 mb-2">Module Decade Projection</h2>
      <BarChart labels={moduleLabels} values={moduleValues} color="bg-purple-500" />

      {/* Notes */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold mb-2">Scenario Notes</h2>
        <p className="text-slate-400">{scenario.notes}</p>
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
