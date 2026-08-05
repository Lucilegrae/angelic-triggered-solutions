"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function SovereignCommandMatrix() {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_command_matrix");
      if (!error && data) setMatrix(data);
    })();
  }, []);

  if (!matrix.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Sovereign Command Matrix ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting command matrix data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Sovereign Command Matrix ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Master control interface across all ATS Infinity engines and governance arcs.
      </p>

      <div className="pdf-card p-4">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-1">Node</th>
              <th className="text-left py-1">Engine</th>
              <th className="text-left py-1">Priority</th>
              <th className="text-left py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((m, i) => (
              <tr key={i} className="border-t border-slate-700">
                <td className="py-1">{m.node_label}</td>
                <td className="py-1">{m.engine_label}</td>
                <td className="py-1">{m.priority_level}</td>
                <td className="py-1">{m.status_label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
