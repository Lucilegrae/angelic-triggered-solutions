"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Status badge
function StatusBadge({ status }) {
  const color =
    status === "online"
      ? "bg-green-700"
      : status === "degraded"
      ? "bg-yellow-700"
      : "bg-red-700";

  return (
    <span className={`${color} px-3 py-1 rounded text-slate-200 text-sm`}>
      {status.toUpperCase()}
    </span>
  );
}

// Federation link strength
function StrengthBadge({ strength }) {
  const color =
    strength > 0.7 ? "bg-green-700" :
    strength > 0.4 ? "bg-yellow-700" :
    strength > 0.2 ? "bg-orange-700" :
    "bg-red-700";

  return (
    <span className={`${color} px-3 py-1 rounded text-slate-200 text-sm`}>
      {strength.toFixed(2)}
    </span>
  );
}

export default function LedgerFederation() {
  const [fed, setFed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFederation() {
      const { data, error } = await supabase.rpc("ledger_federation_engine");

      if (error) console.error("Ledger Federation RPC error:", error);

      setFed(data || null);
      setLoading(false);
    }

    loadFederation();
  }, []);

  if (loading) {
    return <div className="p-6 text-slate-200">Activating Federation Engine…</div>;
  }

  if (!fed) {
    return <div className="p-6 text-slate-200">No federation data available.</div>;
  }

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">ATS Ledger Federation Engine</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Modules Federated</h2>
          <p className="text-3xl mt-2">{fed.modules_federated}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Federation Integrity</h2>
          <p className="text-3xl mt-2">{fed.integrity_score}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Heartbeat Status</h2>
          <StatusBadge status={fed.heartbeat_status} />
        </div>

      </div>

      {/* Module Registry */}
      <h2 className="text-xl font-bold mb-2">Federated Modules</h2>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <ul className="space-y-2 text-slate-300">
          {fed.module_registry.map((m, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{m.module_name}</span>
              <StatusBadge status={m.status} />
            </li>
          ))}
        </ul>
      </div>

      {/* Federation Links */}
      <h2 className="text-xl font-bold mb-2">Federation Links</h2>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <ul className="space-y-2 text-slate-300">
          {fed.links.map((l, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{l.from} → {l.to}</span>
              <StrengthBadge strength={l.strength} />
            </li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mt-6">
        <h2 className="text-xl font-semibold mb-2">Federation Notes</h2>
        <p className="text-slate-400">{fed.notes}</p>
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
