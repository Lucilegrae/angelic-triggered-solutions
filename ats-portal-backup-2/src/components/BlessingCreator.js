"use client";

import { useState } from "react";
import { addBlessing } from "./supabaseClient";

export default function BlessingCreator({ stakeholderId }) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    const payload = {
      stakeholder_id: stakeholderId,
      blessing: text,
    };

    const { data, error } = await addBlessing(payload);

    setSubmitting(false);

    if (error) {
      setError(error.message || "Failed to add blessing.");
      return;
    }

    setMessage("Blessing added.");
    setText("");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm mb-1">Blessing Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded text-slate-950"
      >
        {submitting ? "Saving…" : "Add Blessing"}
      </button>

      {message && <p className="text-emerald-400">{message}</p>}
      {error && <p className="text-red-400">{error}</p>}
    </form>
  );
}
