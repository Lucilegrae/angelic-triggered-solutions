"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function LedgerProfile() {
  const { id } = useParams<{ id: string }>();
  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLedger() {
      const { data, error } = await supabase.rpc("get_ledger_entry", {
        ledger_id: id,
      });

      if (error) console.error("Ledger RPC error:", error);

      setEntry(data || null);
      setLoading(false);
    }

    loadLedger();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Ledger Entry…</div>;
  }

  if (!entry) {
    return <div className="p-6 text-slate-200">Ledger entry not found.</div>;
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">

      <h1 className="text-2xl font-bold mb-4">Ledger Entry</h1>

      {/* Core Ledger Details */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">UUID: {entry.uuid}</p>
        <p className="text-slate-300">Type: {entry.entry_type}</p>
        <p className="text-slate-300">Amount: {entry.amount_usd} USD</p>
        <p className="text-slate-300">Currency: {entry.currency}</p>
        <p className="text-slate-300 mt-2">
          Timestamp: {new Date(entry.created_at).toLocaleString()}
        </p>
      </div>

      {/* Description */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-slate-300">{entry.description}</p>
      </div>

      {/* Linked Modules */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Linked Records</h2>

        {entry.miner_id && (
          <p className="text-slate-300">
            Miner:{" "}
            <a
              href={`/portal/miners/${entry.miner_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Miner →
            </a>
          </p>
        )}

        {entry.site_id && (
          <p className="text-slate-300 mt-2">
            Mining Site:{" "}
            <a
              href={`/portal/miners/sites/${entry.site_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Site →
            </a>
          </p>
        )}

        {entry.coordinator_id && (
          <p className="text-slate-300 mt-2">
            Coordinator:{" "}
            <a
              href={`/portal/miners/coordinator/${entry.coordinator_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Coordinator →
            </a>
          </p>
        )}

        {entry.certificate_id && (
          <p className="text-slate-300 mt-2">
            Certificate:{" "}
            <a
              href={`/portal/miners/certificate/${entry.certificate_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Certificate →
            </a>
          </p>
        )}

        {entry.claim_id && (
          <p className="text-slate-300 mt-2">
            Claim:{" "}
            <a
              href={`/portal/miners/claims/${entry.claim_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Claim →
            </a>
          </p>
        )}

        {entry.environment_id && (
          <p className="text-slate-300 mt-2">
            Environmental Compliance:{" "}
            <a
              href={`/portal/miners/environment/${entry.site_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Environment →
            </a>
          </p>
        )}

        {entry.safety_id && (
          <p className="text-slate-300 mt-2">
            Safety Inspection:{" "}
            <a
              href={`/portal/miners/safety/${entry.site_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Safety →
            </a>
          </p>
        )}

        {entry.gnss_id && (
          <p className="text-slate-300 mt-2">
            GNSS Survey:{" "}
            <a
              href={`/portal/miners/sites/gnss/${entry.site_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View GNSS →
            </a>
          </p>
        )}
      </div>

      {/* Back */}
      <a
        href="/portal/ledger"
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Back to Ledger →
      </a>
    </div>
  );
}
