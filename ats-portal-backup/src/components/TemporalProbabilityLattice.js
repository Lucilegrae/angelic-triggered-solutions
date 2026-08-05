"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TemporalProbabilityLattice() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_temporal_probability_lattice");
      if (!error && data) setRows(data);
    })();
  }, []);

  if (!rows.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Temporal Probability Lattice ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting temporal lattice data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Temporal Probability Lattice ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Probabilistic temporal structures across civilizational horizons.
      </p>

      <div className="pdf-card p-4">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="text-slate-400">
              <th className="py-1 text-left">Lattice</th>
              <th className="py-1 text-left">Horizon</th>
              <th className="py-1 text-left">Probability</th>
              <th className="py-1 text-left">Stability</th>
              <th className="py-1 text-left">Arc</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-700">
                <td className="py-1">{r.lattice_label}</td>
                <td className="py-1">{r.horizon_label}</td>
                <td className="py-1">{r.probability_index}%</td>
                <td className="py-1">{r.stability_index}%</td>
                <td className="py-1">{r.arc_label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
