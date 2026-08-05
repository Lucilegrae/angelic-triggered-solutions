"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VerificationDashboard() {
  const searchParams = useSearchParams();

  const [id, setId] = useState("");
  const [type, setType] = useState("stakeholder");
  const [result, setResult] = useState<any>(null);
  const [status, setStatus] = useState("");

  async function verify(idValue: string, typeValue: string) {
    setStatus("Verifying...");
    setResult(null);

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: idValue, type: typeValue }),
    });

    const data = await res.json();
    setStatus(data.status);
    setResult(data);
  }

  // Auto‑verify when QR parameters exist
  useEffect(() => {
    const qId = searchParams.get("id");
    const qType = searchParams.get("type");

    if (qId && qType) {
      setId(qId);
      setType(qType);
      verify(qId, qType);
    }
  }, [searchParams]);

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS Verification Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Verification Type</label>
          <select
            className="border rounded p-2 w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="stakeholder">Stakeholder</option>
            <option value="certificate">Certificate</option>
            <option value="invitation">Invitation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">ID / Reference</label>
          <input
            className="border rounded p-2 w-full"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Scan QR or paste ID"
          />
        </div>
      </div>

      <button
        onClick={() => verify(id, type)}
        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
      >
        Verify
      </button>

      {status && <p className="mt-3 text-sm text-gray-700">Status: {status}</p>}

      {result && result.status === "verified" && (
        <div className="mt-4 border rounded p-4 bg-white shadow">
          <h3 className="text-lg font-bold mb-2">Verification Details</h3>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(result.record, null, 2)}
          </pre>
        </div>
      )}

      {result && result.status === "not_found" && (
        <div className="mt-4 border rounded p-4 bg-red-50 text-red-700">
          {result.message}
        </div>
      )}
    </div>
  );
}
