"use client";

import { useEffect, useState } from "react";

export default function CeremonyPage() {
  const [stakeholders, setStakeholders] = useState([]);

  async function generatePDF(id: string) {
    const res = await fetch("/api/onboarding/ceremony-pdf", {
      method: "POST",
      body: JSON.stringify({ stakeholder_id: id })
    });

    const json = await res.json();
    const link = document.createElement("a");
    link.href = "data:application/pdf;base64," + json.pdf_base64;
    link.download = "ATS_Ceremony_Certificate.pdf";
    link.click();
  }

  useEffect(() => {
    fetch("/api/onboarding/list")
      .then(res => res.json())
      .then(json => setStakeholders(json.stakeholders || []));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Onboarding Ceremony Certificates</h1>

      <table className="w-full text-xs border border-slate-800">
        <thead className="bg-slate-900/40">
          <tr>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Role</th>
            <th className="px-3 py-2">Dashboard</th>
            <th className="px-3 py-2">Certificate</th>
          </tr>
        </thead>
        <tbody>
          {stakeholders.map((s, idx) => (
            <tr key={idx} className="border-t border-slate-800">
              <td className="px-3 py-2">{s.full_name}</td>
              <td className="px-3 py-2">{s.role}</td>
              <td className="px-3 py-2">{s.dashboard_path}</td>
              <td className="px-3 py-2">
                <button
                  onClick={() => generatePDF(s.id)}
                  className="px-3 py-1 bg-emerald-600 rounded"
                >
                  Generate PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
