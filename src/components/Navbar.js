import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <div className="logo" style={{ marginBottom: "10px", textAlign: "center" }}>
        <img src="/logo.png" alt="Company Logo" style={{ height: "60px" }} />
      </div>
      <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
      <Link to="/about" style={{ margin: "0 10px" }}>About</Link>
      <Link to="/projects" style={{ margin: "0 10px" }}>Projects</Link>
      <Link to="/services" style={{ margin: "0 10px" }}>Services</Link>
      <Link to="/contact" style={{ margin: "0 10px" }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
