"use client";

import { useState } from "react";

export default function SuccessForecastDashboard() {
  const [stakeholderId, setStakeholderId] = useState("");
  const [success, setSuccess] = useState(null);

  async function loadSuccess() {
    const res = await fetch("/api/onboarding/success-forecast", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: stakeholderId })
    });
    const json = await res.json();
    setSuccess(json.success);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Stakeholder Success Probability Modeling</h1>

      <input
        className="px-3 py-2 bg-slate-800 rounded"
        placeholder="Stakeholder ID"
        value={stakeholderId}
        onChange={e => setStakeholderId(e.target.value)}
      />

      <button onClick={loadSuccess} className="px-3 py-2 bg-emerald-600 rounded">
        Forecast Success
      </button>

      {success && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="text-lg font-semibold">{success.name}</p>
          <p>Sector: {success.sector}</p>
          <p>Stage: {success.stage}</p>
          <p>Success Score: {Math.round(success.success_score)}</p>
          <p>Success Category: {success.success_category}</p>
          <p className="font-semibold">Pathway:</p>
          <p>{success.pathway}</p>
        </div>
      )}
    </div>
  );
}
