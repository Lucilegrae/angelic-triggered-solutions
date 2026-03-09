import React from "react";
import Banner from "./../components/Banner";
import "./../theme.css";

export default function Home() {
  return (
    <div className="aura-bg">
      {/* Ceremonial Banner */}
      <Banner />

      {/* Logo with Aura */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", margin: "2rem 0" }}>
        <img
          src="/logo.png"   // <-- logo.png must be inside public/
          alt="ATS Logo"
          className="logo"
          style={{
            height: "70px",
            width: "auto",
            filter: "drop-shadow(0 0 6px rgba(255,215,0,0.8))"
          }}
        />
        <span
          className="slogan-arc aura-heading"
          style={{ fontSize: "2rem", fontWeight: "bold" }}
        >
          Angelic Triggered Solutions
        </span>
      </div>

      {/* Covenant Heading */}
      <h1 className="slogan-arc aura-heading" style={{ marginBottom: "1.5rem" }}>
        ✦ Welcome to Our Anthology ✦
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
        Angelic Triggered Solutions Pvt Ltd is a covenantal systems architect,
        blending technical precision, expressive branding, and communal resonance.  
        Every journey begins with a glyph — narratable, motif‑driven, and spiritually resonant.
      </p>

      {/* Glyph Cards for Highlights */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "center"
        }}
      >
        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Mission</h2>
          <p>
            To heal infrastructure and empower communities with aura overlays, covenantal resonance, and stakeholder affirmation.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Vision</h2>
          <p>
            A narratable anthology where every project, service, and renewal is a glyph — spiritually resonant and stakeholder‑ready.
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Our Values</h2>
          <p>
            Covenant, trust, sustainability, and communal prosperity — guiding every initiative and ceremonial affirmation.
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
        ✦ Every page is a glyph in our anthology — covenantally affirmed and spiritually resonant. ✦
      </p>
    </div>
  );
}
