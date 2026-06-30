"use client";

import { useEffect, useState } from "react";

export function LegitimacyDiffViewer({ eventId }: { eventId: string }) {
  const [diff, setDiff] = useState<any>(null);

  useEffect(() => {
    fetch("/api/legitimacy-diff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId }),
    })
      .then((res) => res.json())
      .then((d) => setDiff(d.diff));
  }, [eventId]);

  if (!diff) return null;

  return (
    <div className="p-4 aura-form" style={{ "--aura": "var(--aura-miner)" } as any}>
      <h2 className="text-xl font-bold mb-2">Legitimacy Event Diff</h2>

      <div className="mt-2">
        <h3 className="font-bold">Current State</h3>
        <div>Stage: {diff.current.stage}</div>
        <div>Progress: {diff.current.progress}</div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Archived Event</h3>
        <div>Stage: {diff.archived.stage}</div>
        <div>Progress: {diff.archived.progress}</div>
        <div>Source: {diff.archived.source}</div>
        <div>Anomaly: {diff.archived.anomaly ? "Yes" : "No"}</div>
        <div>Timestamp: {new Date(diff.archived.created_at).toLocaleString()}</div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Differences</h3>
        <div>Stage Changed: {diff.diff.stage_changed ? "Yes" : "No"}</div>
        <div>Progress Delta: {diff.diff.progress_delta}</div>
      </div>
    </div>
  );
}
