import React, { useEffect, useState } from "react";
import { supabase } from ".../supabaseClient";
import "./AuraCards.css";
import "./AuraGrid.css";
import "./AuraHeadings.css";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } else {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();

    // ✅ Attach handlers BEFORE subscribe()
    const channel = supabase
      .channel("projects-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "projects" },
        (payload) => {
          console.log("New project:", payload);
          setProjects((prev) => [{ ...payload.new, animate: true }, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "projects" },
        (payload) => {
          console.log("Updated project:", payload);
          setProjects((prev) =>
            prev.map((p) =>
              p.id === payload.new.id ? { ...payload.new, animate: true } : p
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "projects" },
        (payload) => {
          console.log("Deleted project:", payload);
          setProjects((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      )
      .subscribe(); // 🔥 Subscribe only after handlers are attached

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="aura-grid">
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {projects.length === 0 && <p>No projects found.</p>}
      {projects.map((p) => (
        <div key={p.id} className={`glyph-card ${p.animate ? "aura-fade" : ""}`}>
          <h2 className="aura-heading">{p.name}</h2>
          {p.description && (
            <p style={{ fontStyle: "italic", opacity: 0.8 }}>{p.description}</p>
          )}
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            {new Date(p.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
