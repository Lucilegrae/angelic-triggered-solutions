import React from "react";
import "./../styles/theme.css";   // 🌌 Import aura theme

function AuditTrailFeed() {
  const sampleLogs = [
    {
      id: 1,
      stakeholder: "Community Representative",
      action: "Submitted proposal 'Water Reticulation Project'",
      date: "2026-04-01",
      aura: "projects"
    },
    {
      id: 2,
      stakeholder: "Ministry of Finance Auditor",
      action: "Approved proposal 'Housing Expansion Phase 1'",
      date: "2026-04-02",
      aura: "stakeholders"
    },
    {
      id: 3,
      stakeholder: "Investor Analyst",
      action: "Commented on KPI 'Jobs Created'",
      date: "2026-04-03",
      aura: "affirmations"
    }
  ];

  return (
    <section className="aura-bg p-8 min-h-screen text-white">
      <h1 className="aura-heading">Audit Trail Feed</h1>
      <div className="grid grid-cols-1 gap-6">
        {sampleLogs.map(log => (
          <div
            key={log.id}
            className={`tab-content fade-in ${log.aura} p-4 rounded-lg`}
          >
            <p className="font-bold">{log.stakeholder}</p>
            <p>{log.action}</p>
            <p className="text-sm text-gray-400">{log.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AuditTrailFeed;
