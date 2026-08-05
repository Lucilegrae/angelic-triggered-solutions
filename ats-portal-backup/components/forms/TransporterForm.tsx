import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TransporterForm() {
  const [form, setForm] = useState({
    name: "",
    fleet_size: "",
    transport_zone: "",
    vehicle_types: "",
    contact_info: "",
  });

  async function submit() {
    await supabase.from("transporter_profiles").insert({
      name: form.name,
      fleet_size: Number(form.fleet_size),
      transport_zone: form.transport_zone,
      vehicle_types: form.vehicle_types,
      contact_info: form.contact_info,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Transporter Enrolment</h2>

      <input placeholder="Transporter Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Fleet Size"
        onChange={e => setForm({ ...form, fleet_size: e.target.value })} />

      <input placeholder="Transport Zone"
        onChange={e => setForm({ ...form, transport_zone: e.target.value })} />

      <input placeholder="Vehicle Types"
        onChange={e => setForm({ ...form, vehicle_types: e.target.value })} />

      <input placeholder="Contact Info"
        onChange={e => setForm({ ...form, contact_info: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
