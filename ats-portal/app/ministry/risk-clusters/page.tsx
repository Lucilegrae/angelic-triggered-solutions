"use client";

import { useEffect, useState } from "react";

function riskColor(level: string) {
  if (level === "High Risk") return "text-red-400 font-semibold";
  if (level === "Medium Risk") return "text-amber-300 font-semibold";
  return "text-emerald-300 font-semibold";
}

export default function RiskClustersPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("/api/dashboard/risk-clusters")
      .then(res => res.json())
      .then(json => setRows(json.clusters || []));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Risk Cluster Dashboard</h1>

      <table className="w-full text-xs border border-slate-800">
        <thead className="bg-slate-900/40">
          <tr>
            <th className="px-3 py-2">Block</th>
            <th className="px-3 py-2">Allocated</th>
            <th className="px-3 py-2">Capacity</th>
            <th className="px-3 py-2">Pressure %</th>
            <th className="px-3 py-2">Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-slate-800">
              <td className="px-3 py-2">{r.block}</td>
              <td className="px-3 py-2">{r.allocated}</td>
              <td className="px-3 py-2">{r.capacity}</td>
              <td className="px-3 py-2">{r.pressure_percent}%</td>
              <td className={`px-3 py-2 ${riskColor(r.risk_level)}`}>
                {r.risk_level}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
