import React, { useState } from "react"
import "./../theme.css"
import AddProjectForm from "../components/AddProjectForm"
import ProjectsList from "../components/ProjectsList"
import StakeholdersList from "../components/StakeholdersList"
import AffirmationsList from "../components/AffirmationsList"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects")

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
          background: "linear-gradient(90deg, rgba(74,144,226,0.6), rgba(255,215,0,0.6))",
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
  )
}
