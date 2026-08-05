"use client";

import { useState } from "react";

export default function MinistryTemplates() {
  const [stakeholderId, setStakeholderId] = useState("");
  const [templates, setTemplates] = useState([]);

  async function loadTemplates() {
    const res = await fetch("/api/onboarding/document-templates", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: stakeholderId })
    });

    const json = await res.json();
    setTemplates(json.templates || []);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Ministry Document Templates</h1>

      <input
        className="px-3 py-2 bg-slate-800 rounded"
        placeholder="Stakeholder ID"
        value={stakeholderId}
        onChange={e => setStakeholderId(e.target.value)}
      />

      <button
        onClick={loadTemplates}
        className="px-3 py-2 bg-emerald-600 rounded"
      >
        Load Templates
      </button>

      <div className="space-y-4 mt-6">
        {templates.map((t, idx) => (
          <div key={idx} className="bg-slate-900 p-4 rounded">
            <p className="text-lg font-semibold">{t.doc_type}</p>
            <a
              href={t.template_url}
              target="_blank"
              className="text-blue-400 underline text-sm"
            >
              Download Template
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
