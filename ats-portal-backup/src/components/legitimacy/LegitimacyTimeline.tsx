"use client";

import { useEffect, useState } from "react";

export function LegitimacyTimeline() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/legitimacy-timeline")
      .then((res) => res.json())
      .then((d) => setRows(d.timeline || []));
  }, []);

  return (
    <div className="p-4 aura-form" style={{ "--aura": "var(--aura-community)" } as any}>
      <h2 className="text-xl font-bold mb-4">Legitimacy Event Timeline</h2>

      <div className="flex flex-col gap-4">
        {rows.map((row) => (
          <div key={row.id} className="p-3 border border-gray-700 rounded relative">

            {/* Timeline vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-700"></div>

            {/* Event content */}
            <div className="ml-4">
              <div className="text-lg font-bold">{row.stage}</div>
              <div>Progress: {row.progress}</div>
              <div>Source: {row.source}</div>
              <div>Anomaly: {row.anomaly ? "Yes" : "No"}</div>
              <div className="text-sm text-gray-400">
                {new Date(row.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
