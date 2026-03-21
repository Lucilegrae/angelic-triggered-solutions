import React from "react";

export default function Footer() {
  return (
    <footer style={{
      background: "#111",
      color: "#fff",
      textAlign: "center",
      padding: "1rem",
      position: "relative"
    }}>
      <p>&copy; {new Date().getFullYear()} Angelic Triggered Solutions</p>
      <h2 className="slogan-arc">
        “Our covenant guides every path.”
      </h2>
    </footer>
  );
}
