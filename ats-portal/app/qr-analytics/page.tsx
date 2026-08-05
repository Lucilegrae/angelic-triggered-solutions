"use client";

import { useEffect, useState } from "react";

export default function QRAnalyticsDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/qr/analytics");
      const data = await res.json();
      setStats(data);
    }
    load();
  }, []);

  if (!stats) return <div className="p-6">Loading analytics...</div>;

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS QR Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border rounded bg-white shadow">
          <h3 className="font-semibold">QR Generated</h3>
          <p className="text-2xl">{stats.totalGenerated}</p>
        </div>

        <div className="p-4 border rounded bg-white shadow">
          <h3 className="font-semibold">Verified</h3>
          <p className="text-2xl">{stats.totalVerified}</p>
        </div>

        <div className="p-4 border rounded bg-white shadow">
          <h3 className="font-semibold">Failed</h3>
          <p className="text-2xl">{stats.totalFailed}</p>
        </div>

        <div className="p-4 border rounded bg-white shadow">
          <h3 className="font-semibold">Success Rate</h3>
          <p className="text-2xl">{stats.successRate}%</p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2">QR Type Distribution</h3>
      <pre className="text-xs bg-gray-100 p-3 rounded">
        {JSON.stringify(stats.typeCounts, null, 2)}
      </pre>

      <h3 className="text-lg font-bold mt-6 mb-2">Daily Verification Activity</h3>
      <pre className="text-xs bg-gray-100 p-3 rounded">
        {JSON.stringify(stats.dailyActivity, null, 2)}
      </pre>
    </div>
  );
}
