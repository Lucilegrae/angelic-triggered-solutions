"use client";

import { useState } from "react";
import { addComplianceEvent } from "./supabaseClient";

export default function ComplianceEventCreator({ stakeholderId }) {
  const [form, setForm] = useState({
    compliance_type: "",
    description: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const payload = {
      stakeholder_id: stakeholderId,
      compliance_type: form.compliance_type,
      description: form.description,
    };

    const { data, error } = await addComplianceEvent(payload);

    setSubmitting(false);

    if (error) {
      setError(error.message || "Failed to add compliance event.");
      return;
    }

    setMessage(\`Compliance event "\${data.compliance_type}" added.\`);
    setForm({ compliance_type: "", description: "" });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm mb-1">Compliance Type</label>
        <input
          type="text"
          name="compliance_type"
          value={form.compliance_type}
          onChange={handleChange}
          required
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded text-slate-950"
      >
        {submitting ? "Saving…" : "Add Compliance Event"}
      </button>

      {message && <p className="text-emerald-400">{message}</p>}
      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
}
