"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function InsuranceProfile({ params }) {
  const { id } = params;
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPolicy() {
      const { data, error } = await supabase.rpc("get_insurance_policy", {
        policy_id: id,
      });

      if (error) {
        console.error("Insurance Profile RPC error:", error);
      }

      setPolicy(data || null);
      setLoading(false);
    }

    loadPolicy();
  }, [id]);

  async function updateStatus(status) {
    await supabase.rpc("rpc_update_policy_status", {
      policy_id: id,
      new_status: status,
    });

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Insurance Profile…</h2>
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Policy not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{policy.policy_name}</h1>

      {/* Core Details */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <p className="text-slate-300">Stakeholder: {policy.stakeholder_name}</p>
        <p className="text-slate-300">Premium: {policy.premium_amount} USD</p>
        <p className="text-slate-300">Payout: {policy.payout_amount} USD</p>
        <p className="text-slate-300">
          Issued: {new Date(policy.created_at).toLocaleString()}
        </p>

        <p className="text-slate-300 mt-2">
          Status:{" "}
          {policy.status === "active"
            ? "✔ Active"
            : policy.status === "expired"
            ? "⚠ Expired"
            : policy.status === "pending"
            ? "⏳ Pending"
            : policy.status}
        </p>
      </div>

      {/* Ledger + Certificate */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Ledger & Certificate</h2>

        <p className="text-slate-300">Ledger ID: {policy.ledger_id}</p>
        <p className="text-slate-300">UUID: {policy.uuid}</p>

        {policy.qr_url && (
          <p className="text-slate-300 mt-2">
            Certificate QR:{" "}
            <a
              href={policy.qr_url}
              className="text-blue-400 hover:text-blue-300"
            >
              View QR →
            </a>
          </p>
        )}
      </div>

      {/* Beneficiaries */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Beneficiaries</h2>

        {policy.beneficiaries && policy.beneficiaries.length > 0 ? (
          <ul className="list-disc list-inside text-slate-400">
            {policy.beneficiaries.map((b, idx) => (
              <li key={idx}>{b}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No beneficiaries listed.</p>
        )}

        <a
          href="/portal/insurance/beneficiaries.html"
          className="mt-3 inline-block text-blue-400 hover:text-blue-300"
        >
          Manage Beneficiaries →
        </a>
      </div>

      {/* Status Controls */}
      <div className="flex gap-3">
        <button
          className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
          onClick={() => updateStatus("active")}
        >
          Activate
        </button>

        <button
          className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-500"
          onClick={() => updateStatus("expired")}
        >
          Expire
        </button>

        <button
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
          onClick={() => updateStatus("suspended")}
        >
          Suspend
        </button>
      </div>
    </div>
  );
}
