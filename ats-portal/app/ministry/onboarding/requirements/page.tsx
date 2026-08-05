"use client";

import { useEffect, useState } from "react";

export default function DocumentRequirements() {
  const [stakeholderId, setStakeholderId] = useState("");
  const [required, setRequired] = useState([]);
  const [uploaded, setUploaded] = useState([]);

  async function load() {
    const req = await fetch("/api/onboarding/required-documents", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: stakeholderId })
    });
    const reqJson = await req.json();

    const up = await fetch("/api/onboarding/list-documents", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: stakeholderId })
    });
    const upJson = await up.json();

    setRequired(reqJson.required_documents || []);
    setUploaded(upJson.documents || []);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Multi-Stage Document Requirements</h1>

      <input
        className="px-3 py-2 bg-slate-800 rounded"
        placeholder="Stakeholder ID"
        value={stakeholderId}
        onChange={e => setStakeholderId(e.target.value)}
      />

      <button
        onClick={load}
        className="px-3 py-2 bg-emerald-600 rounded"
      >
        Load Requirements
      </button>

      <div className="space-y-4">
        <h2 className="text-xl">Required Documents</h2>
        <ul className="list-disc pl-6">
          {required.map((r, idx) => (
            <li key={idx}>{r.doc_type}</li>
          ))}
        </ul>

        <h2 className="text-xl">Uploaded Documents</h2>
        <ul className="list-disc pl-6">
          {uploaded.map((u, idx) => (
            <li key={idx}>
              {u.doc_type} — {u.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
