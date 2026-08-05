import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function InvestorForm() {
  const [form, setForm] = useState({
    name: "",
    fund_size: "",
    investment_focus: "",
  });

  async function submit() {
    await supabase.from("investors").insert({
      name: form.name,
      fund_size: Number(form.fund_size),
      investment_focus: form.investment_focus,
      status: "submitted",
    });
  }

  return (
    <div>
      <h2>Investor Enrolment</h2>

      <input placeholder="Investor Name"
        onChange={e => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Fund Size"
        onChange={e => setForm({ ...form, fund_size: e.target.value })} />

      <input placeholder="Investment Focus"
        onChange={e => setForm({ ...form, investment_focus: e.target.value })} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
