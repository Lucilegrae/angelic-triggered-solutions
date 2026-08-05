"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Bar chart
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

export default function LedgerProjection() {
  const [projection, setProjection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjection() {
      const { data, error } = await supabase.rpc("ledger_multi_year_projection");

      if (error) console.error("Ledger Projection RPC error:", error);

      setProjection(data || null);
      setLoading(false);
    }

    loadProjection();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Generating Multi‑Year Projection…</div>;
  }

  if (!projection) {
    return <div className="p-6 text-slate-200">No projection data available.</div>;
  }

  const horizonLabels = ["1 Year", "3 Years", "5 Years", "10 Years"];
  const horizonValues = [
    projection.year_1_usd,
    projection.year_3_usd,
    projection.year_5_usd,
    projection.year_10_usd,
  ];

  const moduleLabels = projection.module_growth.map((m) => m.module_name);
  const moduleValues = projection.module_growth.map((m) => m.projected_usd);

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">ATS Multi‑Year Financial Projection</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">1‑Year Projection</h2>
          <p className="text-3xl mt-2">{projection.year_1_usd} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">3‑Year Projection</h2>
          <p className="text-3xl mt-2">{projection.year_3_usd} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">5‑Year Projection</h2>
          <p className="text-3xl mt-2">{projection.year_5_usd} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">10‑Year Projection</h2>
          <p className="text-3xl mt-2">{projection.year_10_usd} USD</p>
        </div>

      </div>

      {/* Projection Overview */}
      <h2 className="text-xl font-bold mb-2">Projection Overview</h2>
      <BarChart labels={horizonLabels} values={horizonValues} color="bg-blue-500" />

      {/* Module Growth */}
      <h2 className="text-xl font-bold mt-6 mb-2">Module Growth Projection</h2>
      <BarChart labels={moduleLabels} values={moduleValues} color="bg-purple-500" />

      {/* Notes */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold mb-2">Projection Notes</h2>
        <p className="text-slate-400">{projection.notes}</p>
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
