"use client";

import { useEffect, useState } from "react";
import { listComplianceEvents } from "./supabaseClient";

export default function StakeholderComplianceTimeline({ stakeholderId }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!stakeholderId) return;

    (async () => {
      const { data } = await listComplianceEvents(stakeholderId);
      setEvents(data || []);
    })();
  }, [stakeholderId]);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Compliance Timeline ✦</h2>

      {events.length === 0 && (
        <p className="text-slate-400">No compliance events recorded.</p>
      )}

      <div className="pdf-dashboard-grid">
        {events.map((ev) => (
          <div key={ev.id} className="pdf-card">
            <h3 className="pdf-title">{ev.compliance_type}</h3>

            <p className="pdf-timestamp">
              {new Date(ev.created_at).toLocaleString()}
            </p>

            <p>Description: {ev.description}</p>

            <p>
              Status:{" "}
              {ev.status === "approved"
                ? "✔ Approved"
                : ev.status === "rejected"
                ? "✖ Rejected"
                : "⏳ Pending"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
