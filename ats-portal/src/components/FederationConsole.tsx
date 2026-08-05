"use client";

import { useState } from "react";
import { useFederationRealtime } from "@/hooks/useFederationRealtime";

export default function FederationConsole() {
  const [events, setEvents] = useState<any[]>([]);
  const [status, setStatus] = useState("Idle");

  async function trigger() {
    setStatus("Running…");

    try {
      const res = await fetch("/federation/orchestrate", { method: "POST" });
      const json = await res.json();
      setStatus(`Last run: ${json.ts}`);
    } catch {
      setStatus("Error");
    }
  }

  useFederationRealtime((payload) => {
    setEvents((prev) => [payload.new, ...prev].slice(0, 20));
  });

  return (
    <div className="border border-slate-800 bg-slate-900/40 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Federation Orchestration Console</h3>

        <button
          onClick={trigger}
          className="text-xs px-3 py-1 rounded border border-sky-500/40 text-sky-300 hover:bg-sky-500/10"
        >
          Run Orchestration
        </button>
      </div>

      <p className="text-xs text-slate-400">{status}</p>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {events.map((e, idx) => (
          <div
            key={idx}
            className="border border-slate-700 rounded-lg px-3 py-2 bg-slate-800/40"
          >
            <p className="text-slate-300 text-xs">{e.task_type}</p>
            <p className="text-slate-500 text-[10px]">{e.ts}</p>
            <pre className="text-[10px] text-slate-400 mt-1">
              {JSON.stringify(e.details, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
