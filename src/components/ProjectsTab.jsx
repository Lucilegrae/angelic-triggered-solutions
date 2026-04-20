import React from "react";
import AddProjectForm from "./AddProjectForm";
import "./../theme.css";

export default function ProjectsTab({ projects, stakeholderId }) {
  return (
    <div>
      <h2 className="aura-heading">Projects</h2>

      {/* ✦ Add Project Form ✦ */}
      <AddProjectForm stakeholderId={stakeholderId} />

      {/* ✦ Project Grid ✦ */}
      <div className="aura-grid">
        {projects.length === 0 && <p>No projects found.</p>}
        {projects.map((p) => (
          <div key={p.id} className={`glyph-card ${p.animate ? "aura-fade" : ""}`}>
            <h3 className="aura-heading">{p.name}</h3>
            <p style={{ opacity: 0.8 }}>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
