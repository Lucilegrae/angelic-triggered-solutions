import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GovernmentForm() {
  const [form, setForm] = useState({
    department_name: "",
    jurisdiction: "",
  });

  async function submit() {
    await supabase.from("government").insert({
      department_name: form.department_name,
      jurisdiction: form.jurisdiction,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Government Enrolment</h2>

      <input placeholder="Department Name"
        onChange={e => setForm({ ...form, department_name: e.target.value })} />

      <input placeholder="Jurisdiction"
        onChange={e => setForm({ ...form, jurisdiction: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
