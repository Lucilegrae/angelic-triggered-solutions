"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function QuantumGovernanceKernel() {
  const [kernels, setKernels] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("get_quantum_kernel");
      if (!error && data) setKernels(data);
    })();
  }, []);

  if (!kernels.length) {
    return (
      <div className="pdf-dashboard">
        <h2 className="slogan-arc aura-heading">✦ ATS Infinity Quantum Governance Kernel ✦</h2>
        <p className="text-slate-400 text-sm">Awaiting kernel state data…</p>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Quantum Governance Kernel ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Core quantum state of governance decisions and civilizational outcomes.
      </p>

      <div className="pdf-card p-4">
        <table className="w-full text-xs text-slate-300">
          <thead>
            <tr className="text-slate-400">
              <th className="text-left py-1">Kernel</th>
              <th className="text-left py-1">Arc</th>
              <th className="text-left py-1">Coherence</th>
              <th className="text-left py-1">Volatility</th>
            </tr>
          </thead>
          <tbody>
            {kernels.map((k, i) => (
              <tr key={i} className="border-t border-slate-700">
                <td className="py-1">{k.kernel_label}</td>
                <td className="py-1">{k.arc_label}</td>
                <td className="py-1">{k.coherence_index}%</td>
                <td className="py-1">{k.volatility_index}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
