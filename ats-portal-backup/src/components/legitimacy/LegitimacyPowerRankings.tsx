"use client";

import { useEffect, useState } from "react";

export function LegitimacyPowerRankings() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/legitimacy-power")
      .then((res) => res.json())
      .then((d) => setRows(d.rankings || []));
  }, []);

  return (
    <div className="p-4 aura-form" style={{ "--aura": "var(--aura-government)" } as any}>
      <h2 className="text-xl font-bold mb-4">Legitimacy Power Rankings</h2>

      <div className="flex flex-col gap-3">
        {rows.map((row, index) => (
          <div key={row.user_id} className="p-3 border border-gray-700 rounded">
            <div className="text-lg font-bold">
              #{index + 1} — {row.role}
            </div>
            <div className="text-xl">{row.power.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
