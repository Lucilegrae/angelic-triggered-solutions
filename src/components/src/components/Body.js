import React from "react";
import "./../theme.css";

export default function Body() {
  return (
    <main
      className="aura-bg"
      style={{
        padding: "4rem 2rem",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >
      {/* Covenant Heading */}
      <h1 className="slogan-arc aura-heading" style={{ marginBottom: "2rem" }}>
        ✦ Welcome to Angelic Triggered Solutions ✦
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
        Every initiative we undertake is narratable, motif‑driven, and spiritually resonant.  
        Our covenant is to heal infrastructure, empower communities, and anchor sustainable development.
      </p>

      {/* Glyph Sections */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
        <div className="glyph-card" style={{ maxWidth: "300px" }}>
          <h2 className="slogan-arc aura-heading">Projects</h2>
          <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
            Explore our covenantal projects that transform settlements into sustainable environments.
          </p>
        </div>

        <div className="glyph-card" style={{ maxWidth: "300px" }}>
          <h2 className="slogan-arc aura-heading">Services</h2>
          <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
            Discover motif‑driven services blending technical precision with ceremonial resonance.
          </p>
        </div>

        <div className="glyph-card" style={{ maxWidth: "300px" }}>
          <h2 className="slogan-arc aura-heading">Stakeholders</h2>
          <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
            Join our covenantal dialogue with communities, investors, and government partners.
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
        ✦ Every page is a glyph in our anthology — narratable, motif‑driven, and spiritually resonant. ✦
      </p>
    </main>
  );
}
