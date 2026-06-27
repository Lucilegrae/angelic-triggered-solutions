import React from "react";
import { NavLink } from "react-router-dom";
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
          ATS
        </span>
      </div>

      {/* Covenant Links */}
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <NavLink to="/" className="tab-btn">Home</NavLink>
        <NavLink to="/about" className="tab-btn">About</NavLink>
        <NavLink to="/mission" className="tab-btn">Mission</NavLink>
        <NavLink to="/vision" className="tab-btn">Vision</NavLink>
        <NavLink to="/values" className="tab-btn">Values</NavLink>
        <NavLink to="/projects" className="tab-btn">Projects</NavLink>
        <NavLink to="/dashboard" className="tab-btn">Dashboard</NavLink>
        <NavLink to="/services" className="tab-btn">Services</NavLink>
        <NavLink to="/contact" className="tab-btn">Contact</NavLink>
      </div>
    </nav>
  );
}
