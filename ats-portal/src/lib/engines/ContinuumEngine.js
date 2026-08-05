"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ContinuumEngine() {
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_parallel_timelines");
      if (!error && data) setTimelines(data);
    })();
  }, []);

  if (!timelines.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Continuum Engine ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting parallel timeline data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Continuum Engine ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Comparative analysis of multiple possible civilizational timelines.
      </p>

      <div className="pdf-card grid md:grid-cols-3 gap-4 p-4">
        {timelines.map((t, i) => (
          <div key={i} className="border border-slate-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-slate-200 mb-1">
              {t.timeline_label}
            </h3>
            <p className="text-slate-400 text-xs mb-2">
              Horizon: {t.horizon_label}
            </p>
            <p className="text-slate-300 text-xs mb-2">
              {t.summary}
            </p>
            <p className="text-xs text-slate-500">
              Stability: {t.stability_index}% · Risk: {t.risk_index}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
