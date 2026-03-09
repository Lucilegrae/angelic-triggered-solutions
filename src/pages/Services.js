import React from "react";
import "./../theme.css";

export default function Services() {
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
        ✦ Our Services ✦
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
        Every service we provide is narratable, motif‑driven, and spiritually resonant.
        Our covenant is to blend technical precision, expressive branding, and communal affirmation.
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
        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Infrastructure Healing</h2>
          <p>
            Restoring and upgrading infrastructure with aura overlays and covenantal resonance,
            ensuring sustainable environments for communities.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Community Empowerment</h2>
          <p>
            Providing training, resources, and ceremonial affirmation to equip communities
            for sustainable growth and stakeholder participation.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Stakeholder Engagement</h2>
          <p>
            Facilitating covenantal dialogue between government, investors, and communities,
            ensuring trust and resonance in every initiative.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Consultancy & Advisory</h2>
          <p>
            Strategic guidance for infrastructure healing, project management, and stakeholder engagement.
            Every consultation is narratable and motif‑driven.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Training & Knowledge Transfer</h2>
          <p>
            Equipping communities and miners with expertise, skills, and ceremonial affirmation.
            Focused on sustainable growth and covenantal participation.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Equipment Provision</h2>
          <p>
            Enhancing productivity yields through provision of modern equipment.
            Supporting gold mining and extending beyond a single mineral.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Urban Renewal Services</h2>
          <p>
            Revitalizing urban spaces with glow effects, aura overlays, and motif‑driven storytelling.
            Every renewal is a glyph in our anthology.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Mining & Resource Stewardship</h2>
          <p>
            Offering sustainable extraction and stewardship services, covenantally aligned
            with communal prosperity and environmental responsibility.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Branding & Documentation</h2>
          <p>
            Crafting motif‑driven branding, stakeholder‑ready applications, and ceremonial documentation
            for government and investor submission.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Stakeholder Documentation</h2>
          <p>
            Professional applications, proposals, and covenantal glyphs for government, investors,
            and communal affirmation.
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
        ✦ Each service is a glyph in our anthology — covenantally affirmed and spiritually resonant. ✦
      </p>
    </section>
  );
}
