"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function MinerClaimProfile({ params }) {
  const { id } = params;
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClaim() {
      const { data, error } = await supabase.rpc("get_miner_claim", {
        claim_id: id,
      });

      if (error) console.error("Miner Claim RPC error:", error);

      setClaim(data || null);
      setLoading(false);
    }

    loadClaim();
  }, [id]);

  async function updateStatus(status) {
    await supabase.rpc("rpc_update_miner_claim_status", {
      claim_id: id,
      new_status: status,
    });

    location.reload();
  }

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Claim…</div>;
  }

  if (!claim) {
    return <div className="p-6 text-slate-200">Claim not found.</div>;
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">

      <h1 className="text-2xl font-bold mb-4">{claim.claim_title}</h1>

      {/* Core Claim Details */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">Miner: {claim.miner_name}</p>
        <p className="text-slate-300">Mineral: {claim.mineral_type}</p>
        <p className="text-slate-300">Loss: {claim.loss_kg} kg</p>
        <p className="text-slate-300">
          Filed: {new Date(claim.created_at).toLocaleString()}
        </p>

        <p className="text-slate-300 mt-2">
          Status:{" "}
          {claim.status === "approved"
            ? "✔ Approved"
            : claim.status === "rejected"
            ? "✖ Rejected"
            : "⏳ Pending"}
        </p>
      </div>

      {/* Evidence Viewer */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Evidence</h2>

        {claim.evidence_urls && claim.evidence_urls.length > 0 ? (
          <ul className="list-disc list-inside text-slate-400">
            {claim.evidence_urls.map((url, idx) => (
              <li key={idx}>
                <a href={url} className="text-blue-400 hover:text-blue-300">
                  View Evidence {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No evidence uploaded.</p>
        )}
      </div>

      {/* Cross‑Module Federation */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Cross‑Module Links</h2>

        {claim.miner_id && (
          <p className="text-slate-300">
            Miner Profile:{" "}
            <a
              href={`/portal/miners/${claim.miner_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Miner →
            </a>
          </p>
        )}

        {claim.coordinator_id && (
          <p className="text-slate-300 mt-2">
            Coordinator:{" "}
            <a
              href={`/portal/miners/coordinator/${claim.coordinator_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Coordinator →
            </a>
          </p>
        )}

        {claim.ledger_id && (
          <p className="text-slate-300 mt-2">
            Ledger Entry:{" "}
            <a
              href={`/portal/ledger/${claim.ledger_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Ledger →
            </a>
          </p>
        )}

        {claim.certificate_id && (
          <p className="text-slate-300 mt-2">
            Certificate:{" "}
            <a
              href={`/portal/miners/certificate/${claim.certificate_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Certificate →
            </a>
          </p>
        )}
      </div>

      {/* Status Controls */}
      {claim.status === "pending" && (
        <div className="flex gap-3 mb-6">
          <button
            className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
            onClick={() => updateStatus("approved")}
          >
            Approve Claim
          </button>

          <button
            className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
            onClick={() => updateStatus("rejected")}
          >
            Reject Claim
          </button>
        </div>
      )}

      <a
        href="/portal/miners/claims"
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Back to Miner Claims →
      </a>
    </div>
  );
}
