"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function InsuranceClaimsModule() {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClaims() {
      const { data, error } = await supabase.rpc("list_insurance_claims");

      if (error) {
        console.error("Claims RPC error:", error);
      }

      setClaims(data || []);
      setLoading(false);
    }

    loadClaims();
  }, []);

  async function updateStatus(id, status) {
    await supabase.rpc("rpc_update_claim_status", {
      claim_id: id,
      new_status: status,
    });

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Insurance Claims…</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Insurance Claims</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {claims.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <h2 className="text-xl font-semibold">{c.claim_title}</h2>

            <p className="text-slate-400 mt-2">Policy: {c.policy_name}</p>
            <p className="text-slate-400">Stakeholder: {c.stakeholder_name}</p>

            <p className="text-slate-400 mt-2">
              Claim Amount: {c.claim_amount} USD
            </p>

            <p className="text-slate-400">
              Filed: {new Date(c.created_at).toLocaleString()}
            </p>

            <p className="text-slate-300 mt-2">
              Status:{" "}
              {c.status === "approved"
                ? "✔ Approved"
                : c.status === "rejected"
                ? "✖ Rejected"
                : c.status === "pending"
                ? "⏳ Pending"
                : c.status}
            </p>

            {/* Evidence */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-1">Evidence</h3>
              {c.evidence_urls && c.evidence_urls.length > 0 ? (
                <ul className="list-disc list-inside text-slate-400">
                  {c.evidence_urls.map((url, idx) => (
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

            {/* Status Controls */}
            {c.status === "pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                  onClick={() => updateStatus(c.id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                  onClick={() => updateStatus(c.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}

            {/* Profile Link */}
            <a
              href={`/portal/insurance/claims/${c.id}`}
              className="mt-4 inline-block text-blue-400 hover:text-blue-300"
            >
              View Claim →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
