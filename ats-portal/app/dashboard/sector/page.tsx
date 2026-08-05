"use client";

import { useEffect, useState } from "react";

export default function SectorDashboard() {
  const [data, setData] = useState<any>(null);
  const [sector, setSector] = useState("all");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/certificates/sector");
      const json = await res.json();
      setData(json);
    }
    load();
  }, []);

  if (!data) {
    return <div className="p-6 aura-card">Loading sector dashboard...</div>;
  }

  const sectors = Object.keys(data.grouped);
  const records =
    sector === "all" ? Object.values(data.grouped).flat() : data.grouped[sector];

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS Sector‑Wide Certificate Dashboard</h2>

      {/* ------------------------------ */}
      {/* SECTOR SELECTOR                */}
      {/* ------------------------------ */}
      <div className="mb-4">
        <label className="font-semibold">Select Sector</label>
        <select
          className="border p-2 rounded w-full mt-2"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          <option value="all">All Sectors</option>
          {sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* ------------------------------ */}
      {/* SECTOR ANALYTICS PANEL         */}
      {/* ------------------------------ */}
      <div className="p-4 bg-gray-100 rounded mb-6">
        <h3 className="text-lg font-bold mb-2">Sector Analytics</h3>

        <p>
          <strong>Total Certificates:</strong> {data.total}
        </p>

        <p>
          <strong>Sectors:</strong> {sectors.length}
        </p>

        <p>
          <strong>Selected Sector Count:</strong> {records.length}
        </p>
      </div>

      {/* ------------------------------ */}
      {/* CERTIFICATE GRID               */}
      {/* ------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {records.map((rec: any) => (
          <div key={rec.id} className="border rounded bg-white shadow p-4">
            <h3 className="text-lg font-bold mb-2">{rec.name}</h3>

            <p><strong>ID:</strong> {rec.id}</p>
            <p><strong>Sector:</strong> {rec.sector}</p>
            <p><strong>Issued:</strong> {rec.issued_at}</p>
            <p><strong>Serial:</strong> {rec.serial}</p>

            {rec.revoked && (
              <p className="text-red-600 font-bold mt-2">Revoked</p>
            )}

            {rec.forged && (
              <p className="text-red-600 font-bold mt-2">Forgery Detected</p>
            )}

            {rec.reissued && (
              <p className="text-yellow-600 font-bold mt-2">
                Re‑Issued (from {rec.reissued_from})
              </p>
            )}

            <div className="mt-3">
              <img
                src={rec.certificate_path}
                alt="Certificate"
                className="border rounded shadow w-full"
              />
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href={`/certificate?id=${rec.id}`}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Verify
              </a>

              <a
                href={`/audit-trail?qr_id=${rec.id}`}
                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Audit Trail
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
