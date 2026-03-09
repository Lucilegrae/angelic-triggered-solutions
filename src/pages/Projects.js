import React from "react";
import "./../theme.css";

export default function Projects() {
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
        ✦ Our Projects ✦
      </h1>

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

      {/* Glyph Cards Grid */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "center"
        }}
      >
        {/* Broad Covenant Themes */}
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

        {/* Specific Initiatives */}
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
