import React from "react";
import { NavLink } from "react-router-dom";
import "./theme.css";

export default function Navbar({ branch = "all" }) {
  return (
    <nav className={`app-nav ${branch}`}>
      <NavLink to="/" className="nav-link">🏠 Home</NavLink>
      <NavLink to="/about" className="nav-link">📖 About</NavLink>
      <NavLink to="/mission" className="nav-link">🌟 Mission</NavLink>
      <NavLink to="/vision" className="nav-link">👁️ Vision</NavLink>
      <NavLink to="/values" className="nav-link">⚖️ Values</NavLink>
      <NavLink to="/projects" className="nav-link">🛠️ Projects</NavLink>
      <NavLink to="/services" className="nav-link">💼 Services</NavLink>
      <NavLink to="/dashboard" className="nav-link">📊 Dashboard</NavLink>
      <NavLink to="/audit" className="nav-link">📜 Audit Feed</NavLink>
      <NavLink to="/audit-ledger" className="nav-link">📖 Audit Ledger</NavLink>
      <NavLink to="/audit-dashboard" className="nav-link">⚖️ Audit & Resilience</NavLink>
      <NavLink to="/portal" className="nav-link">🌐 Portal</NavLink>
      <NavLink to="/portal-styled" className="nav-link">✨ Styled Portal</NavLink>
      <NavLink to="/contact" className="nav-link">📬 Contact</NavLink>
    </nav>
  );
}
