"use client";

import { useState } from "react";
import { useUser } from "./useUser";
import { createStakeholder } from "./supabaseClient";
import { calculateLegitimacyScore } from "./StakeholderLegitimacyEngine";
import { updateLegitimacyScore } from "./supabaseClient";

export default function StakeholderRegister() {
  const { user, loading } = useUser();

  const [form, setForm] = useState({
    institution_id: "",
    role: "",
    name: "",
    email: "",
    sector: "",
    pledge: "",
    progress_stage: 0,
    blessings_count: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  if (loading) {
    return <p className="text-slate-400">Loading user context…</p>;
  }

  if (!user) {
    return (
      <p className="text-red-400">
        You must be signed in to onboard stakeholders.
      </p>
    );
  }

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
      institution_id: form.institution_id || null,
      role: form.role,
      name: form.name,
      email: form.email,
      sector: form.sector || null,
      pledge: form.pledge || null,
      progress_stage: Number(form.progress_stage),
      blessings_count: Number(form.blessings_count),
      joined_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await createStakeholder(payload);

if (!error) {
  const score = calculateLegitimacyScore(data);
  await updateLegitimacyScore(data.id, score);
}

    if (error) {
      setError(error.message || "Failed to register stakeholder.");
      setSubmitting(false);
      return;
    }

    // Legitimacy score calculation
    const score = calculateLegitimacyScore(data);
    await updateLegitimacyScore(data.id, score);

    setMessage(`Stakeholder "${data.name}" registered successfully.`);
    setSubmitting(false);

    setForm({
      institution_id: "",
      role: "",
      name: "",
      email: "",
      sector: "",
      pledge: "",
      progress_stage: 0,
      blessings_count: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-slate-900/60 border border-slate-800 rounded-lg p-6"
    >
      <div>
        <label className="block text-sm mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Role</label>
        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Institution ID</label>
        <input
          type="text"
          name="institution_id"
          value={form.institution_id}
          onChange={handleChange}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Sector</label>
        <input
          type="text"
          name="sector"
          value={form.sector}
          onChange={handleChange}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Pledge</label>
        <input
          type="text"
          name="pledge"
          value={form.pledge}
          onChange={handleChange}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Progress Stage</label>
        <input
          type="number"
          name="progress_stage"
          value={form.progress_stage}
          onChange={handleChange}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Blessings Count</label>
        <input
          type="number"
          name="blessings_count"
          value={form.blessings_count}
          onChange={handleChange}
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center px-4 py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-sm font-medium text-slate-950 disabled:opacity-50"
      >
        {submitting ? "Registering…" : "Register Stakeholder"}
      </button>

      {message && (
        <p className="text-emerald-400 text-sm mt-2">
          ✦ {message}
        </p>
      )}
      {error && (
        <p className="text-red-400 text-sm mt-2">
          ⚠ {error}
        </p>
      )}
    </form>
  );
}
