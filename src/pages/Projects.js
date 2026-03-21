import React from "react";
import "./../theme.css";
import AddProjectForm from "../components/AddProjectForm";
import ProjectsList from "../components/ProjectsList";
import StakeholdersList from "../components/StakeholdersList";
import AffirmationsList from "../components/AffirmationsList";

export default function Projects() {
  return (
    <section
      className="aura-bg projects-aura"
      style={{
        padding: "4rem 2rem",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >

      {/* Covenant Heading */}
      <h1 className="slogan-arc aura-heading" style={{ marginBottom: "2rem" }}>
        ✦ Our Projects ✦
      </h1>

      {/* Route-Specific Affirmation Arc */}
      <div
        className="banner-overlay"
        style={{
          marginBottom: "2rem",
          padding: "1rem",
          background: "linear-gradient(90deg, rgba(0,128,255,0.4), rgba(0,255,128,0.4))",
          borderRadius: "8px",
          boxShadow: "0 0 18px rgba(0,128,255,0.8)",
          animation: "bannerGlow 4s infinite alternate"
        }}
      >
        <h2
          className="slogan-arc aura-heading"
          style={{ fontSize: "1.2rem", fontWeight: "bold", margin: 0 }}
        >
          ✦ Innovation Glyphs — Projects covenantally affirmed ✦
        </h2>
      </div>

      {/* Pledge Line */}
      <p
        className="pledge-line"
        style={{
          maxWidth: "900px",
          margin: "0 auto 2rem",
          lineHeight: "1.8",
          fontSize: "16px"
        }}
      >
        Every project we undertake is narratable, motif‑driven, and spiritually resonant.
        Each initiative is a living glyph in our anthology — covenantally affirmed and stakeholder‑ready.
      </p>

      {/* 🔮 Supabase-powered Form */}
      <div style={{ marginBottom: "3rem" }}>
        <AddProjectForm />
      </div>

      {/* 🌐 Live Supabase Projects */}
      <h2 className="slogan-arc aura-heading" style={{ marginBottom: "1.5rem" }}>
        ✦ Live Projects ✦
      </h2>
      <ProjectsList />

      {/* 🌐 Live Stakeholder Pledges */}
      <h2 className="slogan-arc aura-heading" style={{ margin: "3rem 0 1.5rem" }}>
        ✦ Stakeholder Affirmations ✦
      </h2>
      <StakeholdersList />

      {/* 🌐 Live Affirmations */}
      <h2 className="slogan-arc aura-heading" style={{ margin: "3rem 0 1.5rem" }}>
        ✦ Ceremonial Affirmations ✦
      </h2>
      <AffirmationsList />

      {/* Glyph Cards Grid (Static ceremonial themes) */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "center",
          marginTop: "3rem"
        }}
      >
        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Harare Southlands Settlement</h2>
          <p>
            Transforming informal settlements into sustainable housing environments,
            backed by trusted guarantors and covenantal participation.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Community Empowerment Programs</h2>
          <p>
            Equipping communities with skills, resources, and ceremonial affirmation
            for sustainable growth and stakeholder resonance.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Infrastructure Healing</h2>
          <p>
            Blending technical precision with aura overlays to restore communal trust
            and create narratable, motif‑driven environments.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Southlands Slum Restructuring</h2>
          <p>
            Transforming informal settlements into sustainable, covenantal communities.
            Infrastructure healing meets expressive branding for stakeholder resonance.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Mining Rights Expansion</h2>
          <p>
            Extending approved mining rights by 45 hectares, ensuring sustainable extraction
            anchored in communal affirmation and covenantal stewardship.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Urban Renewal Initiatives</h2>
          <p>
            Revitalizing urban spaces with aura overlays, glow effects, and stakeholder‑ready
            storytelling. Every renewal is a glyph in our anthology.
          </p>
        </div>
      </div>

      {/* Closing Arc */}
      <p
        className="pledge-line"
        style={{
          marginTop: "3rem",
          fontSize: "14px",
          opacity: "0.85"
        }}
      >
        ✦ Each project is a glyph in our anthology — covenantally affirmed and spiritually resonant. ✦
      </p>
    </section>
  );
}
