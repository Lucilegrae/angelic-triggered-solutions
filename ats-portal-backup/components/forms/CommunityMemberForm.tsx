import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CommunityMemberForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    community_name: "",
    pledge: "",
    community_id: "",
    role: "",
    household_size: "",
    national_id: "",
  });

  async function submit() {
    await supabase.from("community_members").insert({
      name: form.name,
      email: form.email,
      phone: form.phone,
      community_name: form.community_name,
      pledge: form.pledge,
      community_id: form.community_id,
      role: form.role,
      household_size: Number(form.household_size),
      national_id: form.national_id,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Community Member Enrolment</h2>

      <input placeholder="Full Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />

      <input placeholder="Phone"
        onChange={e => setForm({ ...form, phone: e.target.value })} />

      <input placeholder="Community Name"
        onChange={e => setForm({ ...form, community_name: e.target.value })} />

      <input placeholder="Pledge"
        onChange={e => setForm({ ...form, pledge: e.target.value })} />

      <input placeholder="Community ID"
        onChange={e => setForm({ ...form, community_id: e.target.value })} />

      <input placeholder="Role"
        onChange={e => setForm({ ...form, role: e.target.value })} />

      <input placeholder="Household Size"
        onChange={e => setForm({ ...form, household_size: e.target.value })} />

      <input placeholder="National ID"
        onChange={e => setForm({ ...form, national_id: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
