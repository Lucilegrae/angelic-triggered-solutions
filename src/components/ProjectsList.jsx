import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./ProjectsList.css"; // aura animations

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    }

    fetchProjects();

    // Real-time subscription
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
              prev.map((proj) =>
                proj.id === payload.new.id ? { ...payload.new, animate: true } : proj
              )
            );
          }
          if (payload.eventType === "DELETE") {
            setProjects((prev) => prev.filter((proj) => proj.id !== payload.old.id));
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
    <div
      style={{
        display: "grid",
        gap: "2rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        justifyContent: "center"
      }}
    >
      {projects.map((project) => (
        <div
          key={project.id}
          className={`glyph-card ${project.animate ? "aura-fade" : ""}`}
        >
          <h2 className="slogan-arc aura-heading">{project.name || project.title}</h2>
          {project.description && (
            <p style={{ fontStyle: "italic", opacity: 0.8 }}>{project.description}</p>
          )}
          {project.aura_overlay && (
            <p style={{ fontStyle: "italic", opacity: 0.8 }}>
              Aura: {project.aura_overlay}
            </p>
          )}
          {project.pdf_export_link && (
            <a
              href={project.pdf_export_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#4a90e2", fontWeight: "bold" }}
            >
              View PDF
            </a>
          )}
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            {new Date(project.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
