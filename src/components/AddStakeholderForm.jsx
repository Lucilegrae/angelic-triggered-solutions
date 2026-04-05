import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "./AddStakeholderForm.css"; // aura styling

export default function AddStakeholderForm() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("stakeholders")
      .insert([{ name, role, contact_email: contactEmail }]);

    if (error) {
      setMessage("Error adding stakeholder: " + error.message);
    } else {
      setMessage("✨ Stakeholder added successfully!");
      setName("");
      setRole("");
      setContactEmail("");
    }
  }

  return (
    <form className="aura-form" onSubmit={handleSubmit}>
      <h3>✦ Add Stakeholder ✦</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <input
        type="email"
        placeholder="Contact Email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
      />
      <button type="submit">Add</button>
      {message && <p>{message}</p>}
    </form>
  );
}
