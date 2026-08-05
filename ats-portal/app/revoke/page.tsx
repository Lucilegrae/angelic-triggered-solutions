"use client";

import { useState } from "react";

export default function RevokeCertificate() {
  const [id, setId] = useState("");
  const [reason, setReason] = useState("");
  const [authority, setAuthority] = useState("");
  const [result, setResult] = useState<any>(null);

  async function revoke() {
    const res = await fetch("/api/certificate/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        certificate_id: id,
        reason,
        authority,
      }),
    });

    const data = await res.json();
    setResult(data);
  }

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS Certificate Revocation</h2>

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Certificate ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Authority (e.g., ATS Council)"
        value={authority}
        onChange={(e) => setAuthority(e.target.value)}
      />

      <button
        onClick={revoke}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Revoke Certificate
      </button>

      {result && (
        <pre className="mt-4 bg-gray-100 p-3 rounded text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
