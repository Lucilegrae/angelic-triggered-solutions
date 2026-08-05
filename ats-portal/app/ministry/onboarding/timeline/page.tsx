"use client";

import { useEffect, useState } from "react";

export default function StakeholderTimeline() {
  const [stakeholderId, setStakeholderId] = useState("");
  const [timeline, setTimeline] = useState([]);

  async function loadTimeline() {
    const res = await fetch("/api/onboarding/timeline", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: stakeholderId })
    });

    const json = await res.json();
    setTimeline(json.timeline || []);
  }

  function color(event: string) {
    switch (event) {
      case "Registration": return "bg-blue-600";
      case "Document Upload": return "bg-yellow-600";
      case "Verification": return "bg-emerald-600";
      case "Dashboard Assignment": return "bg-purple-600";
      case "Activation": return "bg-orange-600";
      case "Ceremony": return "bg-red-600";
      default: return "bg-slate-600";
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Stakeholder Timeline</h1>

      <input
        className="px-3 py-2 bg-slate-800 rounded"
        placeholder="Stakeholder ID"
        value={stakeholderId}
        onChange={e => setStakeholderId(e.target.value)}
      />

      <button
        onClick={loadTimeline}
        className="px-3 py-2 bg-emerald-600 rounded"
      >
        Load Timeline
      </button>

      <div className="mt-6 space-y-6">
        {timeline.map((t, idx) => (
          <div key={idx} className="flex items-start space-x-4">
            <div className={`w-4 h-4 rounded-full ${color(t.event_type)}`}></div>
            <div>
              <div className="text-lg font-semibold">{t.event_type}</div>
              <div className="text-xs text-slate-400">{new Date(t.timestamp).toLocaleString()}</div>
              {t.metadata && (
                <pre className="text-xs bg-slate-900 p-2 rounded mt-1">
                  {JSON.stringify(t.metadata, null, 2)}
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
