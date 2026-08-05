"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";

export default function InsurancePayoutCalculator() {
  const [form, setForm] = useState({
    policy_id: "",
    interest_rate: 5,
    risk_factor: 1.0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function calculate(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { data, error } = await supabase.rpc("rpc_insurance_payout_calculator", {
      policy_id: form.policy_id,
      interest_rate: form.interest_rate,
      risk_factor: form.risk_factor,
    });

    if (error) {
      console.error("Payout Calculator RPC error:", error);
      setResult({ error: error.message });
    } else {
      setResult(data);
    }

    setLoading(false);
  }

  return (
    <div className="p-6 text-slate-200 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Insurance Payout Calculator</h1>

      <form
        onSubmit={calculate}
        className="bg-slate-900 border border-slate-800 p-4 rounded space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">Policy ID</label>
          <input
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.policy_id}
            onChange={(e) => updateField("policy_id", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Interest Rate (%)</label>
          <input
            type="number"
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.interest_rate}
            onChange={(e) => updateField("interest_rate", Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Risk Factor (1.0 = normal)</label>
          <input
            type="number"
            step="0.1"
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.risk_factor}
            onChange={(e) => updateField("risk_factor", Number(e.target.value))}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? "Calculating…" : "Calculate Payout"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-slate-900 border border-slate-800 p-4 rounded">
          {result.error ? (
            <p className="text-red-400">Error: {result.error}</p>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-2">Payout Results</h2>

              <p className="text-slate-300">
                Base Payout: {result.base_payout} USD
              </p>

              <p className="text-slate-300">
                Interest Accumulated: {result.interest_accumulated} USD
              </p>

              <p className="text-slate-300">
                Risk Adjustment: {result.risk_adjustment} USD
              </p>

              <p className="text-slate-300 text-lg mt-2">
                <strong>Total Payout: {result.total_payout} USD</strong>
              </p>

              {result.beneficiary_breakdown && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-1">Beneficiary Breakdown</h3>
                  <ul className="list-disc list-inside text-slate-400">
                    {result.beneficiary_breakdown.map((b, idx) => (
                      <li key={idx}>
                        {b.name}: {b.amount} USD
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
