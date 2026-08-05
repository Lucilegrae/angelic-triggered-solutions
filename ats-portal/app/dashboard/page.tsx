"use client";

import { useEffect, useState } from "react";
import DashboardNavBar from "./NavBar";

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);
  const [allocation, setAllocation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);

      const summaryRes = await fetch("/api/dashboard/allocation/summary");
      const summaryJson = await summaryRes.json();

      const latestRes = await fetch("/api/dashboard/allocation/latest");
      const latestJson = await latestRes.json();

      setSummary(summaryJson.summary ?? null);
      setAllocation(latestJson.allocation ?? []);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <div style={{ padding: 24 }}>Loading Cosmic Dashboard...</div>;
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>ATS Cosmic Dashboard</h1>

      <DashboardNavBar />

      <div style={{ marginBottom: 20 }}>
        <a
          href="/dashboard/block-pressure"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          View Block Pressure Heatmap
        </a>
      </div>

      {summary && (
        <section style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Card title="Total Members" value={summary.total_members} />
          <Card title="Total Units" value={summary.total_units} />
          <Card title="Allocated" value={summary.allocated_count} />
          <Card title="Unallocated" value={summary.unallocated_count} />
          <Card title="Engine Version" value={summary.engine_version} />
          <Card title="Last Run" value={summary.run_timestamp} />
        </section>
      )}

      <section style={{ border: "1px solid #ccc", padding: 16 }}>
        <h2>Latest Allocation Run</h2>

        {allocation.length === 0 ? (
          <p>No allocation records yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Member</th>
                <th>Policy</th>
                <th>Block</th>
                <th>Unit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allocation.map((a) => (
                <tr key={a.member_id}>
                  <td>{a.member_name}</td>
                  <td>{a.policy_number}</td>
                  <td>{a.block}</td>
                  <td>{a.unit_number}</td>
                  <td>{a.allocated ? "Allocated" : "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: any }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 12,
        minWidth: 140,
      }}
    >
      <div style={{ fontSize: 12, color: "#666" }}>{title}</div>
      <div style={{ fontSize: 20, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
