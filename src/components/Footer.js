import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{
      backgroundColor: "#f1f1f1",
      padding: "20px",
      marginTop: "40px",
      textAlign: "center",
      borderTop: "1px solid #ccc"
    }}>
      <div className="logo" style={{ marginBottom: "10px" }}>
        <img src="/logo.png" alt="Company Logo" style={{ height: "50px" }} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>Angelic Triggered Solutions Pvt Ltd</strong><br />
        5 Elephant Close, Borrowdale West, Harare<br />
        Phone: +263 785 002 561 | Email: pnovontony@yahoo.com
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
        <Link to="/about" style={{ margin: "0 10px" }}>About</Link>
        <Link to="/projects" style={{ margin: "0 10px" }}>Projects</Link>
        <Link to="/services" style={{ margin: "0 10px" }}>Services</Link>
        <Link to="/contact" style={{ margin: "0 10px" }}>Contact</Link>
      </div>
      <div style={{ fontSize: "12px", color: "#666" }}>
        © {new Date().getFullYear()} Angelic Triggered Solutions Pvt Ltd — Motif‑driven healing for communities
      </div>
    </footer>
  );
}

export default Footer;
