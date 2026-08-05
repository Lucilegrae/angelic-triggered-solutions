"use client";

import { useEffect, useState } from "react";

type Unit = {
  block_name: string;
  unit_code: string;
  max_families: number;
  current_families: number;
};

export default function OccupancyPage() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUnits() {
      setLoading(true);
      const res = await fetch("/api/dashboard/occupancy");
      const json = await res.json();
      setUnits(json.units ?? []);
      setLoading(false);
    }
    loadUnits();
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading Unit Occupancy Map...</div>;
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>Unit Occupancy Map</h1>
      <p>Shows occupancy per unit and block.</p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Block</th>
            <th>Unit</th>
            <th>Current</th>
            <th>Capacity</th>
            <th>Occupancy %</th>
          </tr>
        </thead>
        <tbody>
          {units.map((u) => {
            const ratio =
              u.max_families > 0 ? u.current_families / u.max_families : 0;
            return (
              <tr key={`${u.block_name}-${u.unit_code}`}>
                <td>{u.block_name}</td>
                <td>{u.unit_code}</td>
                <td>{u.current_families}</td>
                <td>{u.max_families}</td>
                <td>{(ratio * 100).toFixed(0)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
