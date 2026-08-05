"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Simple bar chart renderer
function BarChart({ labels, values, color = "bg-green-500" }) {
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

export default function LedgerTreasury() {
  const [treasury, setTreasury] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTreasury() {
      const { data, error } = await supabase.rpc("ledger_treasury_dashboard");

      if (error) console.error("Ledger Treasury RPC error:", error);

      setTreasury(data || null);
      setLoading(false);
    }

    loadTreasury();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Treasury Dashboard…</div>;
  }

  if (!treasury) {
    return <div className="p-6 text-slate-200">No treasury data available.</div>;
  }

  const inflowLabels = treasury.inflows.map((i) => i.source);
  const inflowValues = treasury.inflows.map((i) => i.amount_usd);

  const outflowLabels = treasury.outflows.map((o) => o.category);
  const outflowValues = treasury.outflows.map((o) => o.amount_usd);

  const moduleLabels = treasury.module_finance.map((m) => m.module_name);
  const moduleValues = treasury.module_finance.map((m) => m.total_usd);

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">ATS Treasury Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Treasury Balance</h2>
          <p className="text-3xl mt-2">{treasury.balance_usd} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Monthly Burn Rate</h2>
          <p className="text-3xl mt-2">{treasury.burn_rate_usd} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Runway</h2>
          <p className="text-3xl mt-2">{treasury.runway_months} months</p>
        </div>

      </div>

      {/* Inflows */}
      <h2 className="text-xl font-bold mb-2">Financial Inflows</h2>
      <BarChart labels={inflowLabels} values={inflowValues} color="bg-blue-500" />

      {/* Outflows */}
      <h2 className="text-xl font-bold mt-6 mb-2">Financial Outflows</h2>
      <BarChart labels={outflowLabels} values={outflowValues} color="bg-red-500" />

      {/* Module Finance */}
      <h2 className="text-xl font-bold mt-6 mb-2">Module Financial Contribution</h2>
      <BarChart labels={moduleLabels} values={moduleValues} color="bg-purple-500" />

      {/* Stability Score */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold mb-2">Treasury Stability Score</h2>
        <p className="text-3xl">{treasury.stability_score}</p>
        <p className="text-slate-400 mt-2">{treasury.stability_status}</p>
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
