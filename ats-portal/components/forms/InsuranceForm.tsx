import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function InsuranceForm() {
  const [form, setForm] = useState({
    name: "",
    license_no: "",
    coverage_types: "",
    contact_info: "",
  });

  async function submit() {
    await supabase.from("insurance_profiles").insert({
      name: form.name,
      license_no: form.license_no,
      coverage_types: form.coverage_types,
      contact_info: form.contact_info,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Insurance Enrolment</h2>

      <input placeholder="Insurance Company Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="License Number"
        onChange={e => setForm({ ...form, license_no: e.target.value })} />

      <input placeholder="Coverage Types"
        onChange={e => setForm({ ...form, coverage_types: e.target.value })} />

      <input placeholder="Contact Info"
        onChange={e => setForm({ ...form, contact_info: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
