import React from "react";
import "../theme.css";

export default function Footer() {
  return (
    <footer className="footer-aura">
      © {new Date().getFullYear()} Angelic Triggered Solutions · 
      <a href="/contact">Contact</a> · 
      <a href="/about">About</a>
    </footer>
  );
}
