import React from "react";
import { Link } from "react-router-dom";
import "./../theme.css";

export default function Navbar() {
  return (
    <nav
      className="aura-bg"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Logo with Aura */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <img
          src="/logo.png"   // <-- Correct path since logo.png is in public/
          alt="ATS Logo"
          className="logo"
          style={{
            height: "50px",
            width: "auto",
            filter: "drop-shadow(0 0 6px rgba(255,215,0,0.8))"
          }}
        />
        <span
          className="slogan-arc aura-heading"
          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
        >
          Angelic Triggered Solutions
        </span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link to="/" className="nav-link aura-button">Home</Link>
        <Link to="/about" className="nav-link aura-button">About</Link>
        <Link to="/mission" className="nav-link aura-button">Mission</Link>
        <Link to="/vision" className="nav-link aura-button">Vision</Link>
        <Link to="/values" className="nav-link aura-button">Values</Link>
        <Link to="/projects" className="nav-link aura-button">Projects</Link>
        <Link to="/services" className="nav-link aura-button">Services</Link>
        <Link to="/contact" className="nav-link aura-button">Contact</Link>
      </div>
    </nav>
  );
}
