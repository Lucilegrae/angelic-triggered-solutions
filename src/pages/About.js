import React from "react";
import "./../theme.css";

export default function About() {
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
        ✦ About Angelic Triggered Solutions ✦
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
        Angelic Triggered Solutions Pvt Ltd is a visionary systems architect company.  
        We ritualize infrastructure healing, expressive branding, and stakeholder‑ready documentation.  
        Every initiative we undertake is narratable, motif‑driven, and spiritually resonant — affirming communal trust and sustainable development.
      </p>

      {/* Glyph Cards for Identity */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "center"
        }}
      >
        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Identity</h2>
          <p>
            We are more than a company — we are a covenantal storyteller.  
            Every glyph we craft carries aura overlays, glow effects, and communal affirmation.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Purpose</h2>
          <p>
            To heal infrastructure, empower communities, and anchor sustainable urban development.  
            Our work transforms settlements and projects into living anthologies.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Vision</h2>
          <p>
            To anchor sustainable development in Zimbabwe and beyond, blending technical precision  
            with ceremonial overlays that affirm communal trust and resonance.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Mission</h2>
          <p>
            Healing infrastructure, empowering communities, and narrating every initiative  
            as a covenantal glyph in our living anthology.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Values</h2>
          <p>
            Transparency, sustainability, communal affirmation, and motif‑driven storytelling  
            guide every covenantal arc we undertake.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Covenant</h2>
          <p>
            We pledge to anchor every project in communal resonance, motif‑driven storytelling,  
            and stakeholder affirmation — ensuring covenantal participation at every stage.
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
        ✦ Our story is a covenantal arc — narratable, motif‑driven, and spiritually resonant. ✦
      </p>
    </section>
  );
}
