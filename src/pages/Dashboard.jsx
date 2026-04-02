import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./../theme.css";
import AddProjectForm from "../components/AddProjectForm";
import ProjectsList from "../components/ProjectsList";
import StakeholdersList from "../components/StakeholdersList";
import AffirmationsList from "../components/AffirmationsList";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");
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

    // Real-time subscription for project changes
    const subscription = supabase
      .channel("projects-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        (payload) => {
          console.log("Project change received!", payload);

          if (payload.eventType === "INSERT") {
            setProjects((prev) => [{ ...payload.new }, ...prev]);
          }
          if (payload.eventType === "UPDATE") {
            setProjects((prev) =>
              prev.map((p) =>
                p.id === payload.new.id ? { ...payload.new } : p
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

  return (
    <section
      className="aura-bg"
      style={{
        padding: "4rem 2rem",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >
      {/* Covenant Heading */}
      <h1 className="slogan-arc aura-heading" style={{ marginBottom: "2rem" }}>
        ✦ Covenant Dashboard ✦
      </h1>

      {/* Ceremonial Banner Overlay */}
      <div
        className="banner-overlay"
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          background:
            "linear-gradient(90deg, rgba(74,144,226,0.6), rgba(255,215,0,0.6))",
          borderRadius: "8px",
          boxShadow: "0 0 18px rgba(255,215,0,0.8)",
          animation: "bannerGlow 4s infinite alternate"
        }}
      >
        <h2
          className="slogan-arc aura-heading"
          style={{ fontSize: "1.2rem", fontWeight: "bold", margin: 0 }}
        >
          ✦ Enter the Covenant Dashboard — Every glyph is affirmed ✦
        </h2>
      </div>

      {/* Tab Navigation */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveTab("projects")}
          className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab("stakeholders")}
          className={`tab-btn ${activeTab === "stakeholders" ? "active" : ""}`}
        >
          Stakeholders
        </button>
        <button
          onClick={() => setActiveTab("affirmations")}
          className={`tab-btn ${activeTab === "affirmations" ? "active" : ""}`}
        >
          Affirmations
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "projects" && (
        <div>
          <h2 className="slogan-arc aura-heading">✦ Live Projects ✦</h2>
          <AddProjectForm />
          <ProjectsList />
          {loading ? (
            <p>Loading projects...</p>
          ) : (
            <ul>
              {projects.map((p) => (
                <li key={p.id}>
                  <strong>{p.name}</strong> — {p.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === "stakeholders" && (
        <div>
          <h2 className="slogan-arc aura-heading">✦ Stakeholder Affirmations ✦</h2>
          <StakeholdersList />
        </div>
      )}

      {activeTab === "affirmations" && (
        <div>
          <h2 className="slogan-arc aura-heading">✦ Ceremonial Affirmations ✦</h2>
          <AffirmationsList />
        </div>
      )}

      {/* Closing Arc */}
      <p
        className="pledge-line"
        style={{
          marginTop: "3rem",
          fontSize: "14px",
          opacity: "0.85"
        }}
      >
        ✦ Each glyph is covenantally affirmed, spiritually resonant, and stakeholder‑ready. ✦
      </p>
    </section>
  );
}
