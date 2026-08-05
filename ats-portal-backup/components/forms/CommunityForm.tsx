import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CommunityForm() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    population: "",
  });

  async function submit() {
    await supabase.from("communities").insert({
      name: form.name,
      location: form.location,
      population: Number(form.population),
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Community Enrolment</h2>

      <input placeholder="Community Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Location"
        onChange={e => setForm({ ...form, location: e.target.value })} />

      <input placeholder="Population"
        onChange={e => setForm({ ...form, population: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
