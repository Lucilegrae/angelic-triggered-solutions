"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function ClaimProfile() {
  const { id } = useParams<{ id: string }>();
  const [claim, setClaim] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClaim() {
      const { data, error } = await supabase.rpc("get_insurance_claim", {
        claim_id: id,
      });

      if (error) {
        console.error("Claim Profile RPC error:", error);
      }

      setClaim(data || null);
      setLoading(false);
    }

    loadClaim();
  }, [id]);

  async function updateStatus(status) {
    await supabase.rpc("rpc_update_claim_status", {
      claim_id: id,
      new_status: status,
    });

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Claim Profile…</h2>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Claim not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{claim.claim_title}</h1>

      {/* Core Claim Details */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">Policy: {claim.policy_name}</p>
        <p className="text-slate-300">Stakeholder: {claim.stakeholder_name}</p>
        <p className="text-slate-300">Claim Amount: {claim.claim_amount} USD</p>
        <p className="text-slate-300">
          Filed: {new Date(claim.created_at).toLocaleString()}
        </p>

        <p className="text-slate-300 mt-2">
          Status:{" "}
          {claim.status === "approved"
            ? "✔ Approved"
            : claim.status === "rejected"
            ? "✖ Rejected"
            : claim.status === "pending"
            ? "⏳ Pending"
            : claim.status}
        </p>
      </div>

      {/* Evidence Viewer */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Evidence</h2>

        {claim.evidence_urls && claim.evidence_urls.length > 0 ? (
          <ul className="list-disc list-inside text-slate-400">
            {claim.evidence_urls.map((url, idx) => (
              <li key={idx}>
                <a
                  href={url}
                  className="text-blue-400 hover:text-blue-300"
                >
                  View Evidence {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No evidence uploaded.</p>
        )}
      </div>

      {/* Ledger + Certificate Linkage */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Ledger & Certificate</h2>

        <p className="text-slate-300">Ledger ID: {claim.ledger_id}</p>
        <p className="text-slate-300">UUID: {claim.uuid}</p>

        {claim.qr_url && (
          <p className="text-slate-300 mt-2">
            Certificate QR:{" "}
            <a
              href={claim.qr_url}
              className="text-blue-400 hover:text-blue-300"
            >
              View QR →
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

      {/* Payout Calculator Link */}
      <a
        href={`/portal/insurance/payout?policy_id=${claim.policy_id}`}
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Calculate Payout →
      </a>
    </div>
  );
}
