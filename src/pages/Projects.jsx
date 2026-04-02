import React from "react";
import "./../theme.css";
import AddProjectForm from "../components/AddProjectForm";
import ProjectsList from "../components/ProjectsList";
import StakeholdersList from "../components/StakeholdersList";
import AffirmationsList from "../components/AffirmationsList";
import GlyphCard from "../components/GlyphCard";

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
        <h2 className="slogan-arc aura-heading" style={{ margin: "3rem 0 1.5rem" }}>
          ✦ Glyph Stream ✦
        </h2>
        <GlyphStream />
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

      {/* Glyph Cards Grid (Ceremonial themes) */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "center",
          marginTop: "3rem"
        }}
      >
        <GlyphCard
          title="Harare Southlands Settlement"
          description="Transforming informal settlements into sustainable housing environments, backed by trusted guarantors and covenantal participation."
          sound="/chime.mp3"
        />
        <GlyphCard
          title="Community Empowerment Programs"
          description="Equipping communities with skills, resources, and ceremonial affirmation for sustainable growth and stakeholder resonance."
          sound="/chime.mp3"
        />
        <GlyphCard
          title="Infrastructure Healing"
          description="Blending technical precision with aura overlays to restore communal trust and create narratable, motif‑driven environments."
          sound="/chime.mp3"
        />
        <GlyphCard
          title="Southlands Slum Restructuring"
          description="Transforming informal settlements into sustainable, covenantal communities. Infrastructure healing meets expressive branding for stakeholder resonance."
          sound="/chime.mp3"
        />
        <GlyphCard
          title="Mining Rights Expansion"
          description="Extending approved mining rights by 45 hectares, ensuring sustainable extraction anchored in communal affirmation and covenantal stewardship."
          sound="/chime.mp3"
        />
        <GlyphCard
          title="Urban Renewal Initiatives"
          description="Revitalizing urban spaces with aura overlays, glow effects, and stakeholder‑ready storytelling. Every renewal is a glyph in our anthology."
          sound="/chime.mp3"
        />
      </div>

      {/* Closing Arc */}
      <div>
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
      </div>
    </section>
  );
}
