"use client";

import { useEffect, useState } from "react";

export default function FederationHistoryPanel() {
  const [history, setHistory] = useState<any[]>([]);

  async function loadHistory() {
    const res = await fetch("/federation/history");
    const json = await res.json();
    setHistory(json);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="border border-slate-800 bg-slate-900/40 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold">Federation Task History</h3>

      <ul className="text-xs space-y-2">
        {history.map((h: any) => (
          <li
            key={h.id}
            className="border border-slate-700 rounded-lg px-3 py-2 bg-slate-800/40"
          >
            <p className="text-slate-300">{h.task_type}</p>
            <p className="text-slate-500">{h.ts}</p>
            <pre className="text-[10px] text-slate-400 mt-1">
              {JSON.stringify(h.details, null, 2)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
