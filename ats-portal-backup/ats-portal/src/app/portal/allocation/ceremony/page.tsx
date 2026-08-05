"use client";

import { useState } from "react";
import AllocationCeremonyRenderer from "@/components/ats/allocation/AllocationCeremonyRenderer";

export default function AllocationCeremonyPage() {
  const [allocation, setAllocation] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function startCeremony() {
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
      <h1 className="aura-title">🏛 ATS Allocation Ceremony</h1>

      <button className="aura-button" onClick={startCeremony} disabled={loading}>
        {loading ? "Preparing Ceremony..." : "Start Ceremony"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {allocation.length > 0 && <AllocationCeremonyRenderer allocation={allocation} />}
    </div>
  );
}
