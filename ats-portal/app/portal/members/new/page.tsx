"use client";

import { useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";

export default function NewMember() {
  useStaffGuard();

  const [form, setForm] = useState({});
  const [status, setStatus] = useState<any>(null);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitForm(e) {
    e.preventDefault();
    const res = await fetch("/api/members/create", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setStatus(data);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register New Member</h2>

      <form onSubmit={submitForm} className="grid grid-cols-1 gap-4 max-w-xl">
        <input name="surname" placeholder="Surname" onChange={updateField} className="p-2 bg-slate-800 rounded" />
        <input name="first_names" placeholder="First Names" onChange={updateField} className="p-2 bg-slate-800 rounded" />
        <input name="dob" placeholder="Date of Birth" onChange={updateField} className="p-2 bg-slate-800 rounded" />
        <input name="sex" placeholder="Sex (M/F)" onChange={updateField} className="p-2 bg-slate-800 rounded" />
        <input name="nat_id" placeholder="National ID" onChange={updateField} className="p-2 bg-slate-800 rounded" />
        <input name="address" placeholder="Address" onChange={updateField} className="p-2 bg-slate-800 rounded" />
        <input name="phone" placeholder="Phone Number" onChange={updateField} className="p-2 bg-slate-800 rounded" />

        <button className="bg-blue-600 px-4 py-2 rounded text-white">
          Submit
        </button>
      </form>

      {status && (
        <pre className="mt-4 text-slate-300 bg-slate-900 p-4 rounded border border-slate-800">
          {JSON.stringify(status, null, 2)}
        </pre>
      )}
    </div>
  );
}
