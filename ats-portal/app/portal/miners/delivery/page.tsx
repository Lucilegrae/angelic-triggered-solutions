"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";

export default function MinerDelivery() {
  const [form, setForm] = useState({
    miner_id: "",
    coordinator_id: "",
    site_id: "",
    mineral_type: "",
    output_kg: "",
    evidence_url: "",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submitDelivery(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { data, error } = await supabase.rpc("rpc_submit_miner_delivery", {
      miner_id: form.miner_id,
      coordinator_id: form.coordinator_id,
      site_id: form.site_id,
      mineral_type: form.mineral_type,
      output_kg: Number(form.output_kg),
      evidence_url: form.evidence_url || null,
    });

    if (error) {
      console.error("Miner Delivery RPC error:", error);
      setResult({ error: error.message });
    } else {
      setResult(data);
    }

    setLoading(false);
  }

  return (
    <div className="p-6 text-slate-200 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Miner Delivery Submission</h1>

      <form
        onSubmit={submitDelivery}
        className="bg-slate-900 border border-slate-800 p-4 rounded space-y-4"
      >
        <div>
          <label className="block text-sm mb-1">Miner ID</label>
          <input
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.miner_id}
            onChange={(e) => updateField("miner_id", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Coordinator ID</label>
          <input
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.coordinator_id}
            onChange={(e) => updateField("coordinator_id", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Site ID</label>
          <input
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.site_id}
            onChange={(e) => updateField("site_id", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Mineral Type</label>
          <input
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.mineral_type}
            onChange={(e) => updateField("mineral_type", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Output (kg)</label>
          <input
            type="number"
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.output_kg}
            onChange={(e) => updateField("output_kg", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Evidence URL (optional)</label>
          <input
            className="w-full bg-slate-800 rounded px-2 py-1"
            value={form.evidence_url}
            onChange={(e) => updateField("evidence_url", e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-500"
          disabled={loading}
        >
          {loading ? "Submitting…" : "Submit Delivery"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-slate-900 border border-slate-800 p-4 rounded">
          {result.error ? (
            <p className="text-red-400">Error: {result.error}</p>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-2">Delivery Submitted</h2>
              <p className="text-slate-300">Delivery ID: {result.delivery_id}</p>
              <p className="text-slate-300">Status: Pending Verification</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
