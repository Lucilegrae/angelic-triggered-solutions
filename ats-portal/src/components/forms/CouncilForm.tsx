"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CouncilForm() {
  const [form, setForm] = useState({
    council_name: "",
    jurisdiction: "",
    contact_info: "",
  });

  async function submit() {
    await supabase.from("councils").insert({
      council_name: form.council_name,
      jurisdiction: form.jurisdiction,
      contact_info: form.contact_info,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Council Enrolment</h2>

      <input placeholder="Council Name"
        onChange={e => setForm({ ...form, council_name: e.target.value })} />

      <input placeholder="Jurisdiction"
        onChange={e => setForm({ ...form, jurisdiction: e.target.value })} />

      <input placeholder="Contact Info"
        onChange={e => setForm({ ...form, contact_info: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
