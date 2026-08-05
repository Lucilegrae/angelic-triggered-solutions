"use client";

import { useEffect, useState } from "react";

export default function DashboardAssignments() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("/api/onboarding/list")
      .then(res => res.json())
      .then(json => setRows(json.stakeholders || []));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard Assignments</h1>

      <table className="w-full text-xs border border-slate-800">
        <thead className="bg-slate-900/40">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Role</th>
            <th className="px-3 py-2">Dashboard</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-slate-800">
              <td className="px-3 py-2">{r.full_name}</td>
              <td className="px-3 py-2">{r.role}</td>
              <td className="px-3 py-2">{r.dashboard_path}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
