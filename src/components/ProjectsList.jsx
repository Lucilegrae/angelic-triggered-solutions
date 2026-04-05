import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./AuraCards.css";   // unified aura card styling
import "./AuraGrid.css";    // canonical grid layout
import "./AuraHeadings.css"; // golden aura headings

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false }); // newest first

      if (error) {
        console.error("Error fetching projects:", error);
        setError(error.message);
      } else {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();

    // 🔥 Real-time subscription
    const subscription = supabase
      .channel("projects-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        (payload) => {
          console.log("Project change received!", payload);

          if (payload.eventType === "INSERT") {
            setProjects((prev) => [{ ...payload.new, animate: true }, ...prev]);
          }
          if (payload.eventType === "UPDATE") {
            setProjects((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? { ...payload.new, animate: true } : p
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setProjects((prev) => prev.filter((p) => p.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="aura-grid">
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {projects.length === 0 && <p>No projects found.</p>}
      {projects.map((p) => (
        <div key={p.id} className={`glyph-card ${p.animate ? "aura-fade" : ""}`}>
          <h2 className="slogan-arc aura-heading">{p.title}</h2>
          <p style={{ opacity: 0.8 }}>{p.description}</p>
          {p.aura_overlay && (
            <p style={{ fontStyle: "italic", opacity: 0.7 }}>
              Aura: {p.aura_overlay}
            </p>
          )}
          {p.pdf_export_link && (
            <p style={{ fontSize: "12px" }}>
              <a href={p.pdf_export_link} target="_blank" rel="noopener noreferrer">
                PDF Export
              </a>
            </p>
          )}
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            {new Date(p.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
