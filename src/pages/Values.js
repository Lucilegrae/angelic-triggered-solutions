import React from "react";
import "./../theme.css";

export default function Values() {
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
        ✦ Our Core Values ✦
      </h1>

      {/* Pledge Line */}
      <p
        className="pledge-line"
        style={{
          maxWidth: "900px",
          margin: "0 auto 2rem",
          fontSize: "16px",
          lineHeight: "1.8"
        }}
      >
        Angelic Triggered Solutions Pvt Ltd is guided by covenantal principles that blend technical precision,
        communal affirmation, and sustainable development.  
        Transparency, sustainability, trust, and motif‑driven storytelling shape every glyph we craft and every
        stakeholder journey we affirm.
      </p>

      {/* Glyph Cards for Values Themes */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "center"
        }}
      >
        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Trust & Integrity</h2>
          <p>
            We honor our commitments with transparency and accountability, ensuring stakeholders can rely on ATS
            as a covenantal systems architect.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Sustainability</h2>
          <p>
            Every project is designed to endure — environmentally, socially, and economically — affirming
            prosperity for future generations.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Community Resonance</h2>
          <p>
            We treat every settlement as a living glyph, embedding communal affirmation and spiritual resonance
            into infrastructure healing and development.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Motif‑Driven Storytelling</h2>
          <p>
            Each document, overlay, and renewal is narratable — a glyph in our anthology, spiritually resonant and stakeholder‑ready.
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
        ✦ Our values are covenantally affirmed — guiding every glyph, every arc, and every communal journey. ✦
      </p>
    </section>
  );
}
