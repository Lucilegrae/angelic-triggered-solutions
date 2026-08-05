"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Severity badge
function SeverityBadge({ severity }) {
  const color =
    severity === "low"
      ? "bg-green-700"
      : severity === "medium"
      ? "bg-yellow-700"
      : "bg-red-700";

  return (
    <span className={`${color} px-2 py-1 rounded text-slate-200 text-sm`}>
      {severity.toUpperCase()}
    </span>
  );
}

export default function LedgerAnomalies() {
  const [anomalies, setAnomalies] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnomalies() {
      const { data, error } = await supabase.rpc("ledger_anomaly_detector");

      if (error) console.error("Ledger Anomaly RPC error:", error);

      setAnomalies(data || null);
      setLoading(false);
    }

    loadAnomalies();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Scanning for anomalies…</div>;
  }

  if (!anomalies) {
    return <div className="p-6 text-slate-200">No anomaly data available.</div>;
  }

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">Ledger Anomaly Detector</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Total Anomalies</h2>
          <p className="text-3xl mt-2">{anomalies.total_anomalies}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Modules Scanned</h2>
          <p className="text-3xl mt-2">{anomalies.modules_scanned}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Risk Level</h2>
          <SeverityBadge severity={anomalies.global_risk} />
        </div>
      </div>

      {/* Anomaly List */}
      <h2 className="text-xl font-semibold mb-2">Detected Anomalies</h2>
      <div className="space-y-4">
        {anomalies.items.length === 0 && (
          <p className="text-slate-400">No anomalies detected.</p>
        )}

        {anomalies.items.map((a, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{a.title}</h3>
              <SeverityBadge severity={a.severity} />
            </div>

            <p className="text-slate-400 mt-1">{a.description}</p>

            <p className="text-slate-500 mt-2">Module: {a.module}</p>

            {a.ledger_id && (
              <a
                href={`/portal/ledger/${a.ledger_id}`}
                className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
              >
                View Ledger Entry →
              </a>
            )}

            {a.related_record && (
              <a
                href={`/portal/${a.module}/${a.related_record}`}
                className="text-blue-400 hover:text-blue-300 mt-1 inline-block"
              >
                View Related Record →
              </a>
            )}
          </div>
        ))}
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
