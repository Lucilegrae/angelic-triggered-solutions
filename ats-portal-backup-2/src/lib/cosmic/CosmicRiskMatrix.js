"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CosmicRiskMatrix() {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_cosmic_risk_matrix");
      if (!error && data) setRisks(data);
    })();
  }, []);

  if (!risks.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Cosmic Risk Matrix ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting cosmic risk data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Cosmic Risk Matrix ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Civilizational risk intelligence across cosmic governance arcs.
      </p>

      <div className="pdf-card p-4">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="text-slate-400">
              <th className="py-1 text-left">Risk</th>
              <th className="py-1 text-left">Category</th>
              <th className="py-1 text-left">Likelihood</th>
              <th className="py-1 text-left">Impact</th>
              <th className="py-1 text-left">Arc</th>
            </tr>
          </thead>
          <tbody>
            {risks.map((r, i) => (
              <tr key={i} className="border-t border-slate-700">
                <td className="py-1">{r.risk_label}</td>
                <td className="py-1">{r.risk_category}</td>
                <td className="py-1">{r.likelihood}%</td>
                <td className="py-1">{r.impact}%</td>
                <td className="py-1">{r.arc_label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
