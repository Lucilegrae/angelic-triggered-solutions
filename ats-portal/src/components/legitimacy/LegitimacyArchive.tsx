"use client";

import { useEffect, useState } from "react";
import { LegitimacyDiffViewer } from "@/components/legitimacy/LegitimacyDiffViewer";

export function LegitimacyArchive() {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/legitimacy-archive")
      .then((res) => res.json())
      .then((d) => setRows(d.archive || []));
  }, []);

  return (
    <div className="p-4 aura-form" style={{ "--aura": "var(--aura-bank)" } as any}>
      <h2 className="text-xl font-bold mb-4">Legitimacy Event Archive</h2>

      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.id} className="p-3 border border-gray-700 rounded">
            <div>Stage: {row.stage}</div>
            <div>Progress: {row.progress}</div>
            <div>Source: {row.source}</div>
            <div>Anomaly: {row.anomaly ? "Yes" : "No"}</div>
            <div className="text-sm text-gray-400">
              {new Date(row.created_at).toLocaleString()}
            </div>

            {/* View Diff Button */}
            <button
              className="mt-2 px-3 py-1 border border-blue-500 text-blue-300 text-sm rounded"
              onClick={() => setSelected(selected === row.id ? null : row.id)}
            >
              View Diff
            </button>

            {/* Diff Viewer */}
            {selected === row.id && (
              <div className="mt-3">
                <LegitimacyDiffViewer eventId={row.id} />
              </div>
            )}

            {/* Recovery Button */}
            <button
              className="mt-2 px-3 py-1 border border-red-500 text-red-300 text-sm rounded"
              onClick={async () => {
                await fetch("/api/legitimacy-recover", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ event_id: row.id }),
                });
                alert("Legitimacy state recovered to this event.");
              }}
            >
              Recover to this state
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
