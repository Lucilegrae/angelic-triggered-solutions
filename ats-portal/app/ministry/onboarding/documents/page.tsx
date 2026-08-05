"use client";

import { useEffect, useState } from "react";

export default function DocumentReview() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    fetch("/api/onboarding/list-documents")
      .then(res => res.json())
      .then(json => setDocs(json.documents || []));
  }, []);

  async function updateStatus(id: string, stakeholder_id: string, status: string) {
    await fetch("/api/onboarding/verify-documents", {
      method: "POST",
      body: JSON.stringify({ document_id: id, stakeholder_id, status })
    });
    location.reload();
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Document Verification</h1>

      <table className="w-full text-xs border border-slate-800">
        <thead className="bg-slate-900/40">
          <tr>
            <th className="px-3 py-2">Stakeholder</th>
            <th className="px-3 py-2">Document</th>
            <th className="px-3 py-2">File</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((d, idx) => (
            <tr key={idx} className="border-t border-slate-800">
              <td className="px-3 py-2">{d.stakeholder_name}</td>
              <td className="px-3 py-2">{d.doc_type}</td>
              <td className="px-3 py-2">
                <a href={d.file_url} target="_blank" className="text-blue-400 underline">
                  View
                </a>
              </td>
              <td className="px-3 py-2">{d.status}</td>
              <td className="px-3 py-2 space-x-2">
                <button
                  onClick={() => updateStatus(d.id, d.stakeholder_id, "Approved")}
                  className="px-2 py-1 bg-emerald-600 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(d.id, d.stakeholder_id, "Rejected")}
                  className="px-2 py-1 bg-red-600 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
