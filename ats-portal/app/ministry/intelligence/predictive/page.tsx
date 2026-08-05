"use client";

import { useEffect, useState } from "react";

export default function PredictiveAnalyticsDashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/ministry/predictive-analytics")
      .then(r => r.json())
      .then(j => setItems(j.analytics || []));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Ministry Predictive Analytics</h1>

      <div className="space-y-4">
        {items.map((m, idx) => (
          <div key={idx} className="bg-slate-900 p-4 rounded">
            <p className="text-lg font-semibold">{m.ministry}</p>
            <p>Upliftment Score: {Math.round(m.upliftment_score)}</p>
            <p>Forecast Performance: {Math.round(m.forecast_performance)}</p>
            <p>Trend: {m.trend}</p>
            <p>Risk Level: {m.risk}</p>
            <p className="font-semibold">Recommendation:</p>
            <p>{m.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
