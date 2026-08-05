"use client";

import { useEffect, useState } from "react";

type RiskCluster = {
  name: string;
  block: string;
  pressure_score: number;
};

export default function RiskPage() {
  const [clusters, setClusters] = useState<RiskCluster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClusters() {
      setLoading(true);
      const res = await fetch("/api/dashboard/risk");
      const json = await res.json();
      setClusters(json.clusters ?? []);
      setLoading(false);
    }
    loadClusters();
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading Risk Cluster View...</div>;
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>Risk Cluster View</h1>
      <p>Shows high-pressure blocks / clusters.</p>

      {clusters.length === 0 ? (
        <p>No risk clusters yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Block</th>
              <th>Pressure Score</th>
            </tr>
          </thead>
          <tbody>
            {clusters.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>{c.block}</td>
                <td>{c.pressure_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
