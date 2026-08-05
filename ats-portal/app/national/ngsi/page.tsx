"use client";

import { useEffect, useState } from "react";

export default function NGSI() {
  const [ngsi, setNgsi] = useState(null);

  useEffect(() => {
    fetch("/api/governance/ngsi")
      .then(r => r.json())
      .then(j => setNgsi(j.ngsi));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">National Governance Stability Index</h1>

      {ngsi && (
        <div className="bg-slate-900 p-4 rounded space-y-2">
          <p>Governance Stability Index: {Math.round(ngsi.governance_stability_index)}</p>
          <p>Status: {ngsi.stability_category}</p>
          <p className="font-semibold">Recommendation:</p>
          <p>{ngsi.recommendation}</p>
        </div>
      )}
    </div>
  );
}
