import React from "react";
import { Link } from "react-router-dom";
import "./../theme.css";

export default function Navigation() {
  return (
    <nav
      className="aura-bg"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        padding: "1.5rem",
        borderBottom: "2px solid rgba(255,255,255,0.2)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
      }}
    >
      {/* Logo with Aura */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img
          src="/logo.png"   // <-- logo.png must be inside public/
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
          ATS
        </span>
      </div>

      {/* Covenant Links */}
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <Link to="/" className="aura-link">Home</Link>
        <Link to="/about" className="aura-link">About</Link>
        <Link to="/mission" className="aura-link">Mission</Link>
        <Link to="/vision" className="aura-link">Vision</Link>
        <Link to="/values" className="aura-link">Values</Link>
        <Link to="/projects" className="aura-link">Projects</Link>
        <Link to="/services" className="aura-link">Services</Link>
        <Link to="/contact" className="aura-link">Contact</Link>
      </div>
    </nav>
  );
}
