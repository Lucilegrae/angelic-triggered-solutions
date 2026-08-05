"use client";

import { useState } from "react";
import AllocationQueueVisualizer from "@/components/ats/allocation/AllocationQueueVisualizer";

export default function AllocationQueuePage() {
  const [allocation, setAllocation] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadQueue() {
    setLoading(true);
    setError(null);
    setAllocation([]);

    const res = await fetch("/api/allocation/run", {
      method: "POST",
    });

    const json = await res.json();

    setLoading(false);

    if (!json.ok) {
      setError(json.error);
      return;
    }

    setAllocation(json.allocation);
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">📜 ATS Allocation Queue</h1>

      <button className="aura-button" onClick={loadQueue} disabled={loading}>
        {loading ? "Loading Queue..." : "Load Allocation Queue"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {allocation.length > 0 && <AllocationQueueVisualizer allocation={allocation} />}
    </div>
  );
}
