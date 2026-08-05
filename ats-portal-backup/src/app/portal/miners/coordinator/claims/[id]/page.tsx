"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Simple bar chart renderer
function BarChart({ labels, values, color = "bg-red-500" }) {
  return (
    <div className="bg-slate-800 p-4 rounded">
      <ul className="space-y-2">
        {values.map((v, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-40 text-slate-300">{labels[i]}</span>
            <div className="flex-1 bg-slate-700 h-3 rounded">
              <div
                className={`${color} h-3 rounded`}
                style={{ width: `${v}%` }}
              ></div>
            </div>
            <span className="text-slate-400">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CoordinatorClaimsDashboard({ params }) {
  const { id } = params;
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const { data, error } = await supabase.rpc("miner_coordinator_claims_dashboard", {
        coordinator_id: id,
      });

      if (error) console.error("Coordinator Claims Dashboard RPC error:", error);

      setDashboard(data || null);
      setLoading(false);
    }

    loadDashboard();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-slate-200">Loading Coordinator Claims…</div>;
  }

  if (!dashboard) {
    return <div className="p-6 text-slate-200">No claims available.</div>;
  }

  const claimLabels = dashboard.claims.map((c) => c.claim_title);
  const claimValues = dashboard.claims.map((c) => c.loss_kg);

  const statusLabels = ["Pending", "Approved", "Rejected"];
  const statusValues = [
    dashboard.status_counts.pending,
    dashboard.status_counts.approved,
    dashboard.status_counts.rejected,
  ];

  return (
    <div className="p-6 text-slate-200">

      <h1 className="text-2xl font-bold mb-6">
        Coordinator Claims Dashboard — {dashboard.coordinator_name}
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Total Claims</h2>
          <p className="text-3xl mt-2">{dashboard.total_claims}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Total Loss</h2>
          <p className="text-3xl mt-2">{dashboard.total_loss_kg} kg</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Payout Exposure</h2>
          <p className="text-3xl mt-2">{dashboard.payout_exposure_usd} USD</p>
        </div>
      </div>

      {/* Claim Loss Chart */}
      <h2 className="text-xl font-bold mb-2">Loss by Claim</h2>
      <BarChart labels={claimLabels} values={claimValues} color="bg-yellow-500" />

      {/* Status Distribution */}
      <h2 className="text-xl font-bold mt-6 mb-2">Claim Status Distribution</h2>
      <BarChart labels={statusLabels} values={statusValues} color="bg-blue-500" />

      {/* Claims List */}
      <h2 className="text-xl font-bold mt-6 mb-2">Claims</h2>
      <div className="space-y-4">
        {dashboard.claims.map((c) => (
          <div
            key={c.id}
            className="bg-slate-900 border border-slate-800 p-4 rounded"
          >
            <h3 className="text-lg font-semibold">{c.claim_title}</h3>

            <p className="text-slate-400 mt-1">Miner: {c.miner_name}</p>
            <p className="text-slate-400">Mineral: {c.mineral_type}</p>
            <p className="text-slate-400">Loss: {c.loss_kg} kg</p>

            <p className="text-slate-300 mt-2">
              Status:{" "}
              {c.status === "approved"
                ? "✔ Approved"
                : c.status === "rejected"
                ? "✖ Rejected"
                : "⏳ Pending"}
            </p>

            <a
              href={`/portal/miners/claims/${c.id}`}
              className="mt-3 inline-block text-blue-400 hover:text-blue-300"
            >
              View Claim →
            </a>
          </div>
        ))}
      </div>

      {/* Back Link */}
      <a
        href={`/portal/miners/coordinator/${id}`}
        className="inline-block text-blue-400 hover:text-blue-300 mt-6"
      >
        Back to Coordinator Profile →
      </a>
    </div>
  );
}
