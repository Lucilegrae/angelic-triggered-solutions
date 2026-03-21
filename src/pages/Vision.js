import React from "react";
import "./../theme.css";

export default function Vision() {
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
        ✦ Our Vision ✦
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
        Angelic Triggered Solutions envisions Zimbabwean communities transformed into
        sustainable, resilient, and spiritually resonant environments.  
        Our vision is to anchor sustainable development in Zimbabwe and beyond,
        blending technical precision with ceremonial overlays that affirm communal trust,
        stakeholder resonance, and spiritual affirmation.  
        Every initiative is a glyph in our anthology — narratable, motif‑driven, and covenantally affirmed.
      </p>

      {/* Glyph Cards for Vision Themes */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "center"
        }}
      >
        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Sustainable Settlements</h2>
          <p>
            Transforming informal settlements into covenantal communities with infrastructure healing,
            sustainable housing, and communal prosperity. Each settlement resonates with trust and affirmation.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Global Resonance</h2>
          <p>
            Extending our covenantal storytelling beyond Zimbabwe, affirming stakeholder trust
            and communal affirmation across borders.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Technological Stewardship</h2>
          <p>
            Harnessing motif‑driven systems, aura overlays, and expressive branding
            to guide sustainable innovation and communal participation.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Spiritual Resonance</h2>
          <p>
            Every initiative is narratable and spiritually affirming, treated as a glyph in our anthology
            of national progress and covenantal storytelling.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Ceremonial Renewal</h2>
          <p>
            Revitalizing urban and rural spaces with glow effects, covenantal storytelling,
            and stakeholder‑ready glyphs of prosperity.
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
        ✦ Our vision is covenantally affirmed — projecting sustainable futures, communal prosperity, and narratable glyphs across generations. ✦
      </p>
    </section>
  );
}
