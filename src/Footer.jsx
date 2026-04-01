import React from "react";
import "./theme.css";
import "./Footer.css";

export default function Footer() {
  return (
    <footer
      className="aura-bg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        marginTop: "3rem",
        borderTop: "2px solid rgba(255,255,255,0.2)",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.25)"
      }}
    >
      {/* Logo with Aura */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem"
        }}
      >
        <img
          src="/logo.png"   // logo.png must be inside public/
          alt="ATS Logo"
          className="logo"
          style={{
            height: "40px",
            width: "auto",
            filter: "drop-shadow(0 0 6px rgba(255,215,0,0.8))"
          }}
        />
        <span
          className="slogan-arc aura-heading"
          style={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          Angelic Triggered Solutions
        </span>
      </div>

      {/* Covenant Links */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginBottom: "1rem"
        }}
      >
        <NavLink to="/" className="tab-btn">Home</NavLink>
        <NavLink to="/projects" className="tab-btn">Projects</NavLink>
        <NavLink to="/dashboard" className="tab-btn">Dashboard</NavLink>
        <NavLink to="/contact" className="tab-btn">Contact</NavLink>
      </div>

      {/* Covenant Closing Arc */}
      <p
        className="pledge-line"
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          opacity: "0.85",
          marginBottom: "1rem",
          textAlign: "center"
        }}
      >
        ✦ Every page is a glyph in our anthology — covenantally affirmed and spiritually resonant. ✦
      </p>

      {/* Stakeholder Contact Glyphs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "1rem"
        }}
      >
        <div className="glyph-card" style={{ maxWidth: "250px" }}>
          <h2 className="slogan-arc aura-heading">Head Office</h2>
          <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
            5 Elephant Close, Borrowdale West, Harare, Zimbabwe
          </p>
        </div>

        <div className="glyph-card" style={{ maxWidth: "250px" }}>
          <h2 className="slogan-arc aura-heading">Phone</h2>
          <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
            +263 785 002 561<br />
            +263 779 129 187
          </p>
        </div>

        <div className="glyph-card" style={{ maxWidth: "250px" }}>
          <h2 className="slogan-arc aura-heading">Email</h2>
          <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
            info@angelictriggeredsolutions.co.zw<br />
            pnovontony@yahoo.com
          </p>
        </div>
      </div>

      {/* Covenant Pledge Line */}
      <div
        className="pledge-line aura-heading"
        style={{
          fontSize: "0.9rem",
          marginTop: "1.5rem",
          textShadow: "0 0 6px rgba(255,255,255,0.6)"
        }}
      >
        ✦ Anchoring communal affirmation ✦
      </div>

      {/* Copyright Arc */}
      <p
        className="pledge-line"
        style={{
          fontSize: "12px",
          marginTop: "1rem",
          opacity: "0.7"
        }}
      >
        © {new Date().getFullYear()} Angelic Triggered Solutions Pvt Ltd — Covenantally Affirmed
      </p>
    </footer>
  );
}
