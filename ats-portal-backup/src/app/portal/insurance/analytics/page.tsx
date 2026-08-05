"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

// Simple chart renderer (canvas-based)
function BarChart({ data, labels }) {
  return (
    <div className="bg-slate-800 p-4 rounded">
      <ul className="space-y-2">
        {data.map((v, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-32 text-slate-300">{labels[i]}</span>
            <div className="flex-1 bg-slate-700 h-3 rounded">
              <div
                className="bg-blue-500 h-3 rounded"
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

export default function InsuranceAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      const { data, error } = await supabase.rpc("insurance_analytics");

      if (error) console.error("Insurance Analytics RPC error:", error);

      setAnalytics(data || null);
      setLoading(false);
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Insurance Analytics…</h2>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6 text-slate-200">
        <h2>No analytics available.</h2>
      </div>
    );
  }

  const statusLabels = ["Active", "Expired", "Suspended"];
  const statusValues = [
    analytics.status_distribution.active,
    analytics.status_distribution.expired,
    analytics.status_distribution.suspended,
  ];

  const beneficiaryLabels = analytics.beneficiary_density.map((b) => b.name);
  const beneficiaryValues = analytics.beneficiary_density.map((b) => b.count);

  const riskLabels = analytics.risk_clusters.map((r) => r.cluster);
  const riskValues = analytics.risk_clusters.map((r) => r.exposure);

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold mb-6">Insurance Analytics Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Total Premiums</h2>
          <p className="text-3xl mt-2">{analytics.total_premiums} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Payout Exposure</h2>
          <p className="text-3xl mt-2">{analytics.total_payouts} USD</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded">
          <h2 className="text-lg font-semibold">Active Policies</h2>
          <p className="text-3xl mt-2">{analytics.active_policies}</p>
        </div>
      </div>

      {/* Status Distribution */}
      <h2 className="text-xl font-bold mb-2">Policy Status Distribution</h2>
      <BarChart data={statusValues} labels={statusLabels} />

      {/* Monthly Issuance */}
      <h2 className="text-xl font-bold mt-6 mb-2">Monthly Issuance Trend</h2>
      <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
        {analytics.monthly_issuance.map((m) => (
          <div key={m.month} className="flex justify-between text-slate-300 py-1">
            <span>{m.month}</span>
            <span>{m.count} policies</span>
          </div>
        ))}
      </div>

      {/* Beneficiary Density */}
      <h2 className="text-xl font-bold mb-2">Beneficiary Density</h2>
      <BarChart data={beneficiaryValues} labels={beneficiaryLabels} />

      {/* Risk Clusters */}
      <h2 className="text-xl font-bold mt-6 mb-2">Risk Exposure Clusters</h2>
      <BarChart data={riskValues} labels={riskLabels} />
    </div>
  );
}
