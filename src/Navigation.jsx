import React from "react";
import "./Navigation.css";
import "./theme.css";

export default function Navigation() {
  return (
    <nav className="aura-bg">
      {/* Logo Area */}
      <div className="logo-area" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img
          src="/logo.png"   // logo.png must be inside public/
          alt="ATS Logo"
          className="logo"
          style={{
            height: "35px",
            width: "auto",
            filter: "drop-shadow(0 0 4px rgba(255,215,0,0.8))"
          }}
        />
        <span className="slogan-arc aura-heading">
          Angelic Triggered Solutions
        </span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <NavLink to="/" className="tab-btn">Home</NavLink>
        <NavLink to="/projects" className="tab-btn">Projects</NavLink>
        <NavLink to="/stakeholders" className="tab-btn">Stakeholders</NavLink>
        <NavLink to="/affirmations" className="tab-btn">Affirmations</NavLink>
        <NavLink to="/dashboard" className="tab-btn">Dashboard</NavLink>
        <NavLink to="/contact" className="tab-btn">Contact</NavLink>
      </div>
    </nav>
  );
}
