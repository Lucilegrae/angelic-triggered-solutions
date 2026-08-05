"use client";

import { useEffect, useState } from "react";

function pressureColor(p: number) {
  if (p >= 80) return "text-red-400";
  if (p >= 50) return "text-amber-300";
  return "text-emerald-300";
}

export default function OccupancyPressurePage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("/api/dashboard/occupancy-pressure")
      .then(res => res.json())
      .then(json => setRows(json.occupancy || []));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Occupancy Pressure Dashboard</h1>

      <table className="w-full text-xs border border-slate-800">
        <thead className="bg-slate-900/40">
          <tr>
            <th className="px-3 py-2">Block</th>
            <th className="px-3 py-2">Unit</th>
            <th className="px-3 py-2">Current</th>
            <th className="px-3 py-2">Capacity</th>
            <th className="px-3 py-2">Unit Pressure</th>
            <th className="px-3 py-2">Block Pressure</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-slate-800">
              <td className="px-3 py-2">{r.block}</td>
              <td className="px-3 py-2">{r.unit}</td>
              <td className="px-3 py-2">{r.total_current}</td>
              <td className="px-3 py-2">{r.total_capacity}</td>
              <td className={`px-3 py-2 ${pressureColor(r.unit_occupancy_percent)}`}>
                {r.unit_occupancy_percent}%
              </td>
              <td className={`px-3 py-2 ${pressureColor(r.block_occupancy_percent)}`}>
                {r.block_occupancy_percent}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
