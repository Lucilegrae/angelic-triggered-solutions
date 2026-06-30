import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SupplierForm() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    supply_scope: "",
    contact_info: "",
    registration_no: "",
  });

  async function submit() {
    await supabase.from("supplier_profiles").insert({
      name: form.name,
      category: form.category,
      supply_scope: form.supply_scope,
      contact_info: form.contact_info,
      registration_no: form.registration_no,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Supplier Enrolment</h2>

      <input placeholder="Supplier Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Category"
        onChange={e => setForm({ ...form, category: e.target.value })} />

      <input placeholder="Supply Scope"
        onChange={e => setForm({ ...form, supply_scope: e.target.value })} />

      <input placeholder="Contact Info"
        onChange={e => setForm({ ...form, contact_info: e.target.value })} />

      <input placeholder="Registration Number"
        onChange={e => setForm({ ...form, registration_no: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
