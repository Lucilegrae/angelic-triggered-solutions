import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import FormInput from "./FormInput";
import "./../theme.css";

export default function AddProjectForm({ stakeholderId }) {
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) {
      setMessage("Error: Project name is required");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("projects").insert([
      {
        name: newProject.name,
        description: newProject.description,
        stakeholder_id: stakeholderId,
      },
    ]);

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("✨ Project added successfully!");
      setNewProject({ name: "", description: "" });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="aura-form glyph-card" style={{ marginBottom: "2rem" }}>
      <h3 className="slogan-arc aura-heading">✦ Add New Project ✦</h3>
      <FormInput
        placeholder="Project Name"
        value={newProject.name}
        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        required
      />
      <FormInput
        textarea
        placeholder="Project Description"
        value={newProject.description}
        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        required
      />
      <button type="submit" className="tab-btn projects" disabled={loading}>
        {loading ? "Adding..." : "Add Project"}
      </button>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </form>
  );
}
