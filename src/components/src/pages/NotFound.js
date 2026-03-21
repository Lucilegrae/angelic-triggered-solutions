import React from "react";
import "./../theme.css";

export default function NotFound() {
  return (
    <section
      className="aura-bg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: "3rem 2rem"
      }}
    >
      {/* Logo with Aura */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <img
          src="/logo.png"   // <-- logo.png must be inside public/
          alt="ATS Logo"
          className="logo"
          style={{
            height: "60px",
            width: "auto",
            filter: "drop-shadow(0 0 6px rgba(255,215,0,0.8))"
          }}
        />
        <span
          className="slogan-arc aura-heading"
          style={{ fontSize: "1.4rem", fontWeight: "bold" }}
        >
          Angelic Triggered Solutions
        </span>
      </div>

      {/* Covenant Heading */}
      <h1 className="slogan-arc aura-heading" style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
        ✦ Page Not Found ✦
      </h1>

      {/* Pledge Line */}
      <p
        className="pledge-line"
        style={{
          maxWidth: "700px",
          margin: "0 auto 2rem",
          fontSize: "16px",
          lineHeight: "1.8"
        }}
      >
        The glyph you seek is beyond this arc.  
        Every covenantal journey has detours — but our aura overlays will guide you back to resonance.
      </p>

      {/* Covenant Pledge Line */}
      <p
        className="pledge-line"
        style={{
          fontSize: "18px",
          lineHeight: "1.6",
          opacity: "0.9",
          marginBottom: "2rem"
        }}
      >
        ✦ Every path is part of the anthology — even the ones not yet written ✦
      </p>

      {/* Call to Action */}
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <a href="/" className="nav-link aura-button">Return Home</a>
        <a href="/mission" className="nav-link aura-button">Our Mission</a>
        <a href="/contact" className="nav-link aura-button">Contact Us</a>
      </div>
    </section>
  );
}
