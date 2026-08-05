"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AllocationReplayRenderer from "@/components/ats/allocation/AllocationReplayRenderer";

export default function AllocationReplayPage() {
  const { id } = useParams<{ id: string }>();

  const [allocation, setAllocation] = useState<any[]>([]);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    loadReplay();
  }, [id]);

  async function loadReplay() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `/api/allocation/replay/${encodeURIComponent(id)}`
      );

      const json = await res.json();

      if (!json.ok) {
        setError(json.error ?? "Unable to load allocation replay.");
        return;
      }

      setAllocation(json.allocation ?? []);
      setTimestamp(json.timestamp ?? null);
    } catch (err) {
      console.error(err);
      setError("Failed to load allocation replay.");
    } finally {
      setLoading(false);
    }
  }

  if (!id) {
    return (
      <div className="ats-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">
        🔁 ATS Allocation Replay
      </h1>

      {loading && (
        <p className="aura-text">
          Loading replay...
        </p>
      )}

      {timestamp && (
        <p className="aura-text">
          Replay of allocation run from{" "}
          {new Date(timestamp).toLocaleString()}
        </p>
      )}

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      {!loading && allocation.length > 0 && (
        <AllocationReplayRenderer allocation={allocation} />
      )}
    </div>
  );
}
