"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuditTrailViewer() {
  const searchParams = useSearchParams();
  const qr_id = searchParams.get("qr_id");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/verify/audit/list`);
      const data = await res.json();
      const filtered = data.records.filter((r: any) => r.qr_id === qr_id);
      setRecords(filtered);
    }
    load();
  }, [qr_id]);

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">Audit Trail for {qr_id}</h2>

      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Event</th>
            <th className="p-2 border">IP</th>
            <th className="p-2 border">User Agent</th>
            <th className="p-2 border">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r: any) => (
            <tr key={r.id}>
              <td className="p-2 border">{r.event}</td>
              <td className="p-2 border">{r.ip_address}</td>
              <td className="p-2 border text-xs">{r.user_agent}</td>
              <td className="p-2 border">{r.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
