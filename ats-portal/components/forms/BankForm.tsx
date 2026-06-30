import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BankForm() {
  const [form, setForm] = useState({
    name: "",
    contact_info: "",
    products_offered: "{}",
  });

  async function submit() {
    await supabase.from("banks").insert({
      name: form.name,
      contact_info: form.contact_info,
      products_offered: JSON.parse(form.products_offered),
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Bank Enrolment</h2>

      <input placeholder="Bank Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Contact Info"
        onChange={e => setForm({ ...form, contact_info: e.target.value })} />

      <textarea placeholder="Products Offered (JSON)"
        onChange={e => setForm({ ...form, products_offered: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
