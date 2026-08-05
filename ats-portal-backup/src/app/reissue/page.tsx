"use client";

import { useState } from "react";

export default function ReissueCertificate() {
  const [oldId, setOldId] = useState("");
  const [authority, setAuthority] = useState("");
  const [result, setResult] = useState<any>(null);

  async function reissue() {
    const res = await fetch("/api/certificate/reissue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        old_certificate_id: oldId,
        authority,
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS Certificate Re‑Issuance</h2>

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Old Certificate ID"
        value={oldId}
        onChange={(e) => setOldId(e.target.value)}
      />

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Authority (e.g., ATS Council)"
        value={authority}
        onChange={(e) => setAuthority(e.target.value)}
      />

      <button
        onClick={reissue}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Re‑Issue Certificate
      </button>

      {result && (
        <pre className="mt-4 bg-gray-100 p-3 rounded text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
