import React from "react";
import "./../theme.css";

export default function Mission() {
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
        ✦ Our Mission ✦
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
        Angelic Triggered Solutions Pvt Ltd exists to heal infrastructure,
        empower communities, and anchor sustainable urban development in Zimbabwe
        and beyond. We blend technical expertise with expressive branding and
        spiritual resonance, ensuring every project is narratable, motif‑driven,
        and covenantally affirming.
      </p>

      {/* Glyph Cards for Mission Themes */}
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
            Transforming informal settlements into sustainable environments,
            blending technical precision with aura overlays and communal resonance.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Community Empowerment</h2>
          <p>
            Equipping communities with skills, resources, and ceremonial affirmation,
            ensuring sustainable growth and covenantal participation.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Stakeholder Resonance</h2>
          <p>
            Every project is a glyph in our anthology, narratable and motif‑driven,
            affirming covenantal trust with stakeholders and partners.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Sustainable Development</h2>
          <p>
            Anchoring urban renewal, mining stewardship, and communal prosperity
            in narratable, motif‑driven storytelling.
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
        ✦ Our mission is covenantally affirmed — healing, empowering, and narrating every glyph in our anthology. ✦
      </p>
    </section>
  );
}
