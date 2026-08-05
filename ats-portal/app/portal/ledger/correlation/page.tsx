"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Correlation badge
function CorrBadge({ value }) {
  const color =
    value > 0.6 ? "bg-green-700" :
    value > 0.3 ? "bg-yellow-700" :
    value > 0 ? "bg-blue-700" :
    value > -0.3 ? "bg-purple-700" :
    value > -0.6 ? "bg-orange-700" :
    "bg-red-700";

  return (
    <span className={`${color} px-3 py-1 rounded text-slate-200 text-sm`}>
      {value.toFixed(2)}
    </span>
  );
}

export default function LedgerCorrelation() {
  const [corr, setCorr] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCorrelation() {
      const { data, error } = await supabase.rpc("ledger_inter_module_correlation");

      if (error) console.error("Ledger Correlation RPC error:", error);

      setCorr(data || null);
      setLoading(false);
    }

    loadCorrelation();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Computing Module Correlations…</div>;
  }

  if (!corr) {
    return <div className="p-6 text-slate-200">No correlation data available.</div>;
  }

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">ATS Inter‑Module Financial Correlation</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Modules Analyzed</h2>
          <p className="text-3xl mt-2">{corr.modules_analyzed}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Strong Positive Links</h2>
          <p className="text-3xl mt-2">{corr.strong_positive}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Strong Negative Links</h2>
          <p className="text-3xl mt-2">{corr.strong_negative}</p>
        </div>

      </div>

      {/* Correlation Matrix */}
      <h2 className="text-xl font-bold mb-2">Correlation Matrix</h2>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded overflow-auto">
        <table className="w-full text-left text-slate-300">
          <thead>
            <tr>
              <th className="p-2">Module</th>
              {corr.modules.map((m, idx) => (
                <th key={idx} className="p-2">{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {corr.matrix.map((row, rIdx) => (
              <tr key={rIdx}>
                <td className="p-2 font-semibold">{corr.modules[rIdx]}</td>
                {row.map((val, cIdx) => (
                  <td key={cIdx} className="p-2">
                    <CorrBadge value={val} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dependency Graph */}
      <h2 className="text-xl font-bold mt-6 mb-2">Financial Dependency Graph</h2>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded">
        <ul className="space-y-2 text-slate-300">
          {corr.dependencies.map((d, idx) => (
            <li key={idx}>
              {d.from} → {d.to}  
              <CorrBadge value={d.strength} />
            </li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold mb-2">Correlation Notes</h2>
        <p className="text-slate-400">{corr.notes}</p>
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
