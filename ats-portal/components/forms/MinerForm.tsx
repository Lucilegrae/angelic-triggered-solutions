import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MinerForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    pledge: "",
    mining_type: "",
    workforce_id: "",
    community_id: "",
    community_member_id: "",
    capacity: "",
    role: "",
  });

  async function submit() {
    await supabase.from("miners").insert({
      name: form.name,
      location: form.location,
      pledge: form.pledge,
      mining_type: form.mining_type,
      workforce_id: form.workforce_id,
      community_id: form.community_id,
      community_member_id: form.community_member_id,
      capacity: Number(form.capacity),
      role: form.role,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Miner Enrolment</h2>

      <input placeholder="Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Location"
        onChange={e => setForm({ ...form, location: e.target.value })} />

      <input placeholder="Pledge"
        onChange={e => setForm({ ...form, pledge: e.target.value })} />

      <input placeholder="Mining Type"
        onChange={e => setForm({ ...form, mining_type: e.target.value })} />

      <input placeholder="Workforce ID"
        onChange={e => setForm({ ...form, workforce_id: e.target.value })} />

      <input placeholder="Community ID"
        onChange={e => setForm({ ...form, community_id: e.target.value })} />

      <input placeholder="Community Member ID"
        onChange={e => setForm({ ...form, community_member_id: e.target.value })} />

      <input placeholder="Capacity"
        onChange={e => setForm({ ...form, capacity: e.target.value })} />

      <input placeholder="Role"
        onChange={e => setForm({ ...form, role: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
