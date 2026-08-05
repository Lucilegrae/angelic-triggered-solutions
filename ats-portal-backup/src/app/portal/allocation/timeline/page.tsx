"use client";

import { useState } from "react";
import AllocationTimelineRenderer from "@/components/ats/allocation/AllocationTimelineRenderer";

export default function AllocationTimelinePage() {
  const [allocation, setAllocation] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadTimeline() {
    setLoading(true);
    setError(null);
    setAllocation([]);

    const res = await fetch("/api/allocation/run", { method: "POST" });
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
      <h1 className="aura-title">⏳ ATS Allocation Timeline</h1>

      <button className="aura-button" onClick={loadTimeline} disabled={loading}>
        {loading ? "Generating Timeline..." : "Generate Timeline"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {allocation.length > 0 && <AllocationTimelineRenderer allocation={allocation} />}
    </div>
  );
}
