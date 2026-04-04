import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false }); // requires created_at column

      if (error) {
        console.error("Error fetching projects:", error.message, error.details, error.hint);
        setError(error.message);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading projects…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="projects-list">
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <div key={project.id} className="glyph-card">
            <h3 className="aura-heading">{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
