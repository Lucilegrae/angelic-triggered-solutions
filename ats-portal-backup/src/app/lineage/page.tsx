"use client";

import { useState } from "react";

export default function CertificateLineageExplorer() {
  const [id, setId] = useState("");
  const [lineage, setLineage] = useState<any>(null);

  async function load() {
    const res = await fetch("/api/certificate/lineage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ certificate_id: id }),
    });

    const data = await res.json();
    setLineage(data);
  }

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS Certificate Lineage Explorer</h2>

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Certificate ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button
        onClick={load}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Load Lineage
      </button>

      {lineage && lineage.status === "ok" && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Certificate</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm">
            {JSON.stringify(lineage.certificate, null, 2)}
          </pre>

          <h3 className="text-lg font-bold mt-6 mb-2">Ancestors</h3>
          {lineage.ancestors.length === 0 ? (
            <p>No ancestors found.</p>
          ) : (
            <pre className="bg-gray-100 p-3 rounded text-sm">
              {JSON.stringify(lineage.ancestors, null, 2)}
            </pre>
          )}

          <h3 className="text-lg font-bold mt-6 mb-2">Descendants</h3>
          {lineage.descendants.length === 0 ? (
            <p>No descendants found.</p>
          ) : (
            <pre className="bg-gray-100 p-3 rounded text-sm">
              {JSON.stringify(lineage.descendants, null, 2)}
            </pre>
          )}

          <h3 className="text-lg font-bold mt-6 mb-2">Sector Migration History</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm">
            {JSON.stringify(lineage.sectorHistory, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
