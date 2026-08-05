"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function OracleEngine() {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_oracle_scenarios");
      if (!error && data) setScenarios(data);
    })();
  }, []);

  if (!scenarios.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Oracle Engine ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting foresight scenarios…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Oracle Engine ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Predictive civilizational foresight across multiple governance arcs.
      </p>

      <div className="pdf-card p-6">
        {scenarios.map((s, i) => (
          <div key={i} className="mb-6 border-b border-slate-700 pb-4">
            <h3 className="text-lg font-semibold text-slate-200">
              {s.title}
            </h3>
            <p className="text-slate-400 text-sm mb-1">
              Horizon: {s.horizon_label}
            </p>
            <p className="text-slate-300 text-sm mb-2">
              {s.description}
            </p>
            <p className="text-xs text-slate-500">
              Probability: {s.probability}% · Impact: {s.impact_level}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
