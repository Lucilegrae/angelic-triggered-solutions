"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function OmniSentienceEngine() {
  const [signals, setSignals] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_omni_sentience");
      if (!error && data) setSignals(data);
    })();
  }, []);

  if (!signals.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Omni‑Sentience Engine ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting omni‑sentience signals…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Omni‑Sentience Engine ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Aggregated sensing across civilizational, emotional, and cosmic fields.
      </p>

      <div className="pdf-card grid md:grid-cols-3 gap-4 p-4">
        {signals.map((s, i) => (
          <div key={i} className="border border-slate-700 rounded-lg p-3">
            <h3 className="text-sm font-semibold text-slate-200 mb-1">
              {s.channel_label}
            </h3>
            <p className="text-slate-400 text-xs mb-2">
              Intensity: {s.intensity_level}% · Clarity: {s.clarity_index}%
            </p>
            <p className="text-slate-300 text-xs">
              {s.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
