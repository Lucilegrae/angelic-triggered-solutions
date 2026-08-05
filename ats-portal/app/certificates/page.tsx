"use client";

import { useEffect, useState } from "react";

export default function CertificateBatchViewer() {
  const [ids, setIds] = useState("");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadBatch() {
    setLoading(true);

    const idList = ids.split(",").map(i => i.trim()).filter(Boolean);

    const res = await fetch("/api/certificate/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: idList }),
    });

    const data = await res.json();

    if (data.status === "ok") {
      setRecords(data.certificates);
    }

    setLoading(false);
  }

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS Multi‑Certificate Batch Viewer</h2>

      <div className="mb-4">
        <label className="font-semibold">Certificate IDs (comma separated)</label>
        <input
          type="text"
          value={ids}
          onChange={(e) => setIds(e.target.value)}
          className="border p-2 rounded w-full mt-2"
          placeholder="e.g. 123, 456, 789"
        />
        <button
          onClick={loadBatch}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Load Batch
        </button>
      </div>

      {loading && <p>Loading certificates...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {records.map((rec: any) => (
          <div key={rec.id} className="border rounded bg-white shadow p-4">
            <h3 className="text-lg font-bold mb-2">{rec.name}</h3>

            <p><strong>ID:</strong> {rec.id}</p>
            <p><strong>Sector:</strong> {rec.sector}</p>
            <p><strong>Issued:</strong> {rec.issued_at}</p>
            <p><strong>Serial:</strong> {rec.serial}</p>

            <div className="mt-3">
              <img
                src={rec.certificate_path}
                alt="Certificate"
                className="border rounded shadow w-full"
              />
            </div>

            <div className="mt-4">
              <a
                href={`/certificate?id=${rec.id}`}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                View Full Verification
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
