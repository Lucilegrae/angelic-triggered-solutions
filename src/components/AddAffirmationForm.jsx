import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "./AddAffirmationForm.css"; // aura styling

export default function AddAffirmationForm() {
  const [slogan, setSlogan] = useState("");
  const [ceremonialArc, setCeremonialArc] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("affirmations")
      .insert([{ slogan, ceremonial_arc: ceremonialArc }]);

    if (error) {
      setMessage("Error adding affirmation: " + error.message);
    } else {
      setMessage("✨ Affirmation added successfully!");
      setSlogan("");
      setCeremonialArc("");
    }
  }

  return (
    <form className="aura-form" onSubmit={handleSubmit}>
      <h3>✦ Add Affirmation ✦</h3>
      <input
        type="text"
        placeholder="Slogan"
        value={slogan}
        onChange={(e) => setSlogan(e.target.value)}
        required
      />
      <textarea
        placeholder="Ceremonial Arc"
        value={ceremonialArc}
        onChange={(e) => setCeremonialArc(e.target.value)}
      />
      <button type="submit">Add</button>
      {message && <p>{message}</p>}
    </form>
  );
}
