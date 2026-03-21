import React from "react";
import "./../theme.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div style={{ fontWeight: "bold", color: "white" }}>
        Angelic Triggered Solutions
      </div>
      <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/projects">Projects</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;
