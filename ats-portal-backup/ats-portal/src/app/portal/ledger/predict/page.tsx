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

export default function LedgerPredict() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForecast() {
      const { data, error } = await supabase.rpc("ledger_predictive_model");

      if (error) console.error("Ledger Predictive Model RPC error:", error);

      setForecast(data || null);
      setLoading(false);
    }

    loadForecast();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Generating Financial Forecast…</div>;
  }

  if (!forecast) {
    return <div className="p-6 text-slate-200">No predictive data available.</div>;
  }

  const horizonLabels = ["7 Days", "30 Days", "90 Days"];
  const horizonValues = [
    forecast.forecast_7d,
    forecast.forecast_30d,
    forecast.forecast_90d,
  ];

  const moduleLabels = forecast.module_predictions.map((m) => m.module_name);
  const moduleValues = forecast.module_predictions.map((m) => m.predicted_usd);

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">ATS Predictive Financial Model</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">7‑Day Forecast</h2>
          <p className="text-3xl mt-2">{forecast.forecast_7d} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">30‑Day Forecast</h2>
          <p className="text-3xl mt-2">{forecast.forecast_30d} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">90‑Day Forecast</h2>
          <p className="text-3xl mt-2">{forecast.forecast_90d} USD</p>
        </div>

      </div>

      {/* Forecast Overview */}
      <h2 className="text-xl font-bold mb-2">Forecast Overview</h2>
      <BarChart labels={horizonLabels} values={horizonValues} color="bg-green-500" />

      {/* Module Predictions */}
      <h2 className="text-xl font-bold mt-6 mb-2">Module Predictions</h2>
      <BarChart labels={moduleLabels} values={moduleValues} color="bg-blue-500" />

      {/* Trend */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold mb-2">Trend Direction</h2>
        <p className="text-3xl">{forecast.trend_direction}</p>
        <p className="text-slate-400 mt-2">{forecast.trend_description}</p>
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
