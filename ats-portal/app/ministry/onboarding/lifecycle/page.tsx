"use client";

import { useState } from "react";

export default function LifecycleDashboard() {
  const [stakeholderId, setStakeholderId] = useState("");
  const [lc, setLc] = useState(null);

  async function loadLifecycle() {
    const res = await fetch("/api/onboarding/lifecycle-forecast", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: stakeholderId })
    });
    const json = await res.json();
    setLc(json.lifecycle);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Stakeholder Lifecycle Prediction Engine</h1>

      <input
        className="px-3 py-2 bg-slate-800 rounded"
        placeholder="Stakeholder ID"
        value={stakeholderId}
        onChange={e => setStakeholderId(e.target.value)}
      />

      <button onClick={loadLifecycle} className="px-3 py-2 bg-emerald-600 rounded">
        Predict Lifecycle
      </button>

      {lc && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="text-lg font-semibold">{lc.name}</p>
          <p>Sector: {lc.sector}</p>
          <p>Stage: {lc.stage}</p>
          <p>Lifecycle Phase: {lc.lifecycle_phase}</p>
          <p>Ceremony Success Probability: {Math.round(lc.ceremony_success_probability)}%</p>
          <p>Upliftment Success Probability: {Math.round(lc.upliftment_success_probability)}%</p>
          <p>Status: {lc.lifecycle_status}</p>
          <p className="font-semibold">Pathway:</p>
          <p>{lc.pathway}</p>
        </div>
      )}
    </div>
  );
}
