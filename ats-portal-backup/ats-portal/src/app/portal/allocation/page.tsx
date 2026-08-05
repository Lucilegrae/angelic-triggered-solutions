"use client";

import { useState } from "react";

export default function AllocationDashboardPage() {
  const [allocation, setAllocation] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function runAllocation() {
    setLoading(true);
    setError(null);
    setAllocation([]);

    const res = await fetch("/api/allocation/run", {
      method: "POST",
    });

    const json = await res.json();

    setLoading(false);

    if (!json.ok) {
      setError(json.error);
      return;
    }

    setAllocation(json.allocation);
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">🏠 ATS Allocation Engine</h1>

      <button className="aura-button" onClick={runAllocation} disabled={loading}>
        {loading ? "Running Allocation..." : "Run Allocation"}
      </button>

      {error && <p className="error-text">{error}</p>}

      {allocation.length > 0 && (
        <table className="aura-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Policy</th>
              <th>Privilege Rank</th>
              <th>Privilege Score</th>
              <th>Allocated</th>
              <th>Block</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {allocation.map((a) => (
              <tr key={a.member_id}>
                <td>{a.member_name}</td>
                <td>{a.policy_number}</td>
                <td>{a.privilegeRank}</td>
                <td>{a.privilegeScore}</td>
                <td>{a.allocated ? "Yes" : "No"}</td>
                <td>{a.block ?? "-"}</td>
                <td>{a.unit_number ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
