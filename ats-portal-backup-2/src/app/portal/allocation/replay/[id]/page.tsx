"use client";

import { useEffect, useState } from "react";
import AllocationReplayRenderer from "@/components/ats/allocation/AllocationReplayRenderer";

export default function AllocationReplayPage({ params }: { params: { id: string } }) {
  const [allocation, setAllocation] = useState<any[]>([]);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadReplay();
  }, []);

  async function loadReplay() {
    const res = await fetch(`/api/allocation/replay/${params.id}`);
    const json = await res.json();

    if (!json.ok) {
      setError(json.error);
      return;
    }

    setAllocation(json.allocation);
    setTimestamp(json.timestamp);
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">🔁 ATS Allocation Replay</h1>

      {timestamp && (
        <p className="aura-text">
          Replay of allocation run from: {new Date(timestamp).toLocaleString()}
        </p>
      )}

      {error && <p className="error-text">{error}</p>}

      {allocation.length > 0 && <AllocationReplayRenderer allocation={allocation} />}
    </div>
  );
}
