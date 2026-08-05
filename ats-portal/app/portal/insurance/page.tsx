"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function InsuranceModule() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPolicies() {
      const { data, error } = await supabase.rpc("list_insurance_policies");

      if (error) {
        console.error("Insurance RPC error:", error);
      }

      setPolicies(data || []);
      setLoading(false);
    }

    loadPolicies();
  }, []);

  async function updateStatus(id, status) {
    await supabase.rpc("rpc_update_policy_status", {
      policy_id: id,
      new_status: status,
    });

    location.reload();
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Insurance Policies…</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-4">Insurance Policies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <h2 className="text-xl font-semibold">{p.policy_name}</h2>

            <p className="text-slate-400 mt-2">Stakeholder: {p.stakeholder_name}</p>
            <p className="text-slate-400">Premium: {p.premium_amount} USD</p>
            <p className="text-slate-400">Payout: {p.payout_amount} USD</p>

            <p className="text-slate-400 mt-2">
              Issued: {new Date(p.created_at).toLocaleString()}
            </p>

            <p className="text-slate-300 mt-2">
              Status:{" "}
              {p.status === "active"
                ? "✔ Active"
                : p.status === "expired"
                ? "⚠ Expired"
                : p.status === "pending"
                ? "⏳ Pending"
                : p.status}
            </p>

            {/* Beneficiaries */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-1">Beneficiaries</h3>
              {p.beneficiaries && p.beneficiaries.length > 0 ? (
                <ul className="list-disc list-inside text-slate-400">
                  {p.beneficiaries.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500">No beneficiaries listed.</p>
              )}
            </div>

            {/* Status Controls */}
            <div className="flex gap-3 mt-4">
              <button
                className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                onClick={() => updateStatus(p.id, "active")}
              >
                Activate
              </button>

              <button
                className="bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-500"
                onClick={() => updateStatus(p.id, "expired")}
              >
                Expire
              </button>

              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                onClick={() => updateStatus(p.id, "suspended")}
              >
                Suspend
              </button>
            </div>

            {/* Profile Link */}
            <a
              href={`/portal/insurance/${p.id}`}
              className="mt-4 inline-block text-blue-400 hover:text-blue-300"
            >
              View Policy →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
