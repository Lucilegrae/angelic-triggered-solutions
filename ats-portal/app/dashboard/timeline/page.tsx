"use client";

import { useEffect, useState } from "react";

type AllocationRun = {
  run_timestamp: string;
  allocation: any[];
};

export default function TimelinePage() {
  const [history, setHistory] = useState<AllocationRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      setLoading(true);
      const res = await fetch("/api/dashboard/timeline");
      const json = await res.json();
      setHistory(json.history ?? []);
      setLoading(false);
    }
    loadHistory();
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading Allocation Timeline...</div>;
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>Allocation Timeline</h1>
      <p>Recent allocation runs ordered by time.</p>

      <div style={{ display: "grid", gap: 16 }}>
        {history.map((run, idx) => (
          <div
            key={run.run_timestamp}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              borderLeft: "4px solid #0070f3",
            }}
          >
            <div style={{ fontWeight: "bold" }}>
              Run #{history.length - idx} — {run.run_timestamp}
            </div>
            <div>Allocations: {run.allocation?.length ?? 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
