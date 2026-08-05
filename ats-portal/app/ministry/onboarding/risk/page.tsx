"use client";

import { useState } from "react";

export default function RiskForecastDashboard() {
  const [stakeholderId, setStakeholderId] = useState("");
  const [risk, setRisk] = useState(null);

  async function loadRisk() {
    const res = await fetch("/api/onboarding/risk-forecast", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: stakeholderId })
    });
    const json = await res.json();
    setRisk(json.risk);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Stakeholder Risk Forecasting</h1>

      <input
        className="px-3 py-2 bg-slate-800 rounded"
        placeholder="Stakeholder ID"
        value={stakeholderId}
        onChange={e => setStakeholderId(e.target.value)}
      />

      <button onClick={loadRisk} className="px-3 py-2 bg-emerald-600 rounded">
        Forecast Risk
      </button>

      {risk && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p className="text-lg font-semibold">{risk.name}</p>
          <p>Sector: {risk.sector}</p>
          <p>Stage: {risk.stage}</p>
          <p>Risk Score: {Math.round(risk.risk_score)}</p>
          <p>Risk Category: {risk.risk_category}</p>
          <p className="font-semibold">Mitigation:</p>
          <p>{risk.mitigation}</p>
        </div>
      )}
    </div>
  );
}
