"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function HyperConvergenceEngine() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_hyper_convergence");
      if (!error && data) setRows(data);
    })();
  }, []);

  if (!rows.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Hyper‑Convergence Engine ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting convergence data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Hyper‑Convergence Engine ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Convergence intelligence across cosmic arcs and dimensional stability fields.
      </p>

      <div className="pdf-card p-4">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="text-slate-400">
              <th className="py-1 text-left">Convergence</th>
              <th className="py-1 text-left">Index</th>
              <th className="py-1 text-left">Stability</th>
              <th className="py-1 text-left">Arc</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-700">
                <td className="py-1">{r.convergence_label}</td>
                <td className="py-1">{r.convergence_index}%</td>
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
