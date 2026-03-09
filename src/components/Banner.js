import React from "react";
import "./../theme.css";

export default function Banner() {
  return (
    <header
      className="aura-bg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
        textAlign: "center",
        boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
        minHeight: "80vh"
      }}
    >
      {/* Logo with Aura */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <img
          src="/logo.png"   // <-- logo.png must be inside public/
          alt="ATS Logo"
          className="logo"
          style={{
            height: "60px",
            width: "auto",
            filter: "drop-shadow(0 0 8px rgba(255,215,0,0.9))"
          }}
        />
        <span
          className="slogan-arc aura-heading"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          Angelic Triggered Solutions
        </span>
      </div>

      {/* Covenant Slogan */}
      <h1
        className="slogan-arc aura-heading"
        style={{
          fontSize: "2.4rem",
          marginBottom: "1.5rem",
          textShadow: "0 0 14px rgba(255,255,255,0.85)"
        }}
      >
        ✦ Healing Infrastructure, Empowering Communities ✦
      </h1>

      {/* Pledge Line */}
      <p
        className="pledge-line"
        style={{
          fontSize: "18px",
          maxWidth: "900px",
          margin: "0 auto 2rem",
          lineHeight: "1.8",
          opacity: "0.9"
        }}
      >
        Healing infrastructure, empowering communities, and anchoring sustainable urban development in Zimbabwe and beyond.  
        Every glyph we craft is narratable, motif‑driven, and spiritually resonant.  
        Each banner is a ceremonial arc — welcoming stakeholders into our anthology of covenantal trust and communal affirmation.
      </p>

      {/* Call to Action */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <a href="/projects" className="nav-link aura-button">Explore Projects</a>
        <a href="/mission" className="nav-link aura-button">Our Mission</a>
      </div>

      {/* Glow Effect Divider */}
      <div
        style={{
          marginTop: "3rem",
          height: "4px",
          width: "140px",
          background: "linear-gradient(90deg, #fff, #ffd700, #fff)",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 0 14px rgba(255,215,0,0.9)"
        }}
      ></div>
    </header>
  );
}
