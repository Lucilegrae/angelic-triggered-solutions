"use client";

import { useEffect, useState } from "react";

export default function AutomationDashboard() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetch("/api/ministry/automation-rules")
      .then(r => r.json())
      .then(j => setRules(j.rules || []));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Ministry Workflow Automation</h1>

      <div className="space-y-4">
        {rules.map((r, idx) => (
          <div key={idx} className="bg-slate-900 p-4 rounded">
            <p className="text-lg font-semibold">{r.rule_name}</p>
            <p>Trigger: {r.trigger_event}</p>
            <p>Condition: {JSON.stringify(r.condition)}</p>
            <p>Action: {JSON.stringify(r.action)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
