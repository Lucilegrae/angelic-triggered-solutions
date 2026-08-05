"use client";

import { useState } from "react";

export default function AutoFillForms() {
  const [stakeholderId, setStakeholderId] = useState("");
  const [template, setTemplate] = useState(null);

  async function loadTemplate() {
    const res = await fetch("/api/onboarding/autofill-template", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: stakeholderId })
    });
    const json = await res.json();
    setTemplate(json.template);
  }

  async function generate() {
    const res = await fetch("/api/onboarding/autofill-generate", {
      method: "POST",
      body: JSON.stringify({
        stakeholder_id: stakeholderId,
        template_id: template.id
      })
    });
    const json = await res.json();

    const link = document.createElement("a");
    link.href = "data:application/pdf;base64," + json.pdf_base64;
    link.download = "autofilled.pdf";
    link.click();
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Ministry Auto-Fill Forms</h1>

      <input
        className="px-3 py-2 bg-slate-800 rounded"
        placeholder="Stakeholder ID"
        value={stakeholderId}
        onChange={e => setStakeholderId(e.target.value)}
      />

      <button onClick={loadTemplate} className="px-3 py-2 bg-emerald-600 rounded">
        Load Template
      </button>

      {template && (
        <div className="space-y-4">
          <p className="text-lg">{template.doc_type}</p>
          <button onClick={generate} className="px-3 py-2 bg-blue-600 rounded">
            Generate Auto-Filled PDF
          </button>
        </div>
      )}
    </div>
  );
}
