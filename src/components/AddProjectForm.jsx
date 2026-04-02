import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import "./AddProjectForm.css"; // aura animations

export default function AddProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [aura, setAura] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("projects").insert([
      {
        name: title,
        description,
        aura_overlay: aura,
        pdf_export_link: pdfLink,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("Project added successfully!");
      setTitle("");
      setDescription("");
      setAura("");
      setPdfLink("");
    }
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glyph-card aura-form"
      style={{ marginBottom: "2rem" }}
    >
      <h3 className="slogan-arc aura-heading">✦ Add New Project ✦</h3>
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Aura Overlay"
        value={aura}
        onChange={(e) => setAura(e.target.value)}
      />
      <input
        type="text"
        placeholder="PDF Export Link"
        value={pdfLink}
        onChange={(e) => setPdfLink(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Project"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
