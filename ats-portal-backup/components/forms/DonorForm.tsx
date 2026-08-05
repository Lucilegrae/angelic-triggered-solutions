import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DonorForm() {
  const [form, setForm] = useState({
    name: "",
    donation_type: "",
    donation_amount: "",
    contact_info: "",
  });

  async function submit() {
    await supabase.from("donor_profiles").insert({
      name: form.name,
      donation_type: form.donation_type,
      donation_amount: Number(form.donation_amount),
      contact_info: form.contact_info,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Donor Enrolment</h2>

      <input placeholder="Donor Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Donation Type"
        onChange={e => setForm({ ...form, donation_type: e.target.value })} />

      <input placeholder="Donation Amount"
        onChange={e => setForm({ ...form, donation_amount: e.target.value })} />

      <input placeholder="Contact Info"
        onChange={e => setForm({ ...form, contact_info: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
