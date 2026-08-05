"use client";

import { useEffect, useState } from "react";

export default function AllocationHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const res = await fetch("/api/allocation/history");
    const json = await res.json();

    if (!json.ok) {
      setError(json.error);
      return;
    }

    setHistory(json.history);
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">📚 Allocation History</h1>

      {error && <p className="error-text">{error}</p>}

      <table className="aura-table">
        <thead>
          <tr>
            <th>Run Time</th>
            <th>Total Members</th>
            <th>Allocated</th>
            <th>Unallocated</th>
            <th>Engine</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id}>
              <td>{new Date(h.run_timestamp).toLocaleString()}</td>
              <td>{h.total_members}</td>
              <td>{h.allocated_count}</td>
              <td>{h.unallocated_count}</td>
              <td>{h.engine_version}</td>
              <td>
                <a className="aura-link" href={`/portal/allocation/history/${h.id}`}>
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
