"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CosmicHealthMonitor() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_omni_kernel");
      if (!error && data) setRows(data);
    })();
  }, []);

  if (!rows.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Cosmic Health Monitor ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting omni-kernel health data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Cosmic Health Monitor ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Health metrics across all registered ATS Infinity engines.
      </p>

      <div className="pdf-card p-4">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-1">Engine</th>
              <th className="text-left py-1">Tier</th>
              <th className="text-left py-1">Stability</th>
              <th className="text-left py-1">Coherence</th>
              <th className="text-left py-1">Resonance</th>
              <th className="text-left py-1">Risk</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-700">
                <td className="py-1">{r.engine_label}</td>
                <td className="py-1">{r.tier_label}</td>
                <td className="py-1">{r.stability_index}%</td>
                <td className="py-1">{r.coherence_index}%</td>
                <td className="py-1">{r.resonance_index}%</td>
                <td className="py-1">{r.risk_index}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
