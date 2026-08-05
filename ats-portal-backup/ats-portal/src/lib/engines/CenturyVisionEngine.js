"use client";

import { useEffect, useState } from "react";

export default function CenturyVisionEngine() {
  const [status, setStatus] = useState("Initializing…");

  useEffect(() => {
    setStatus("ATS 100‑Year Vision Active");
  }, []);

  function vision(axis) {
    switch (axis) {
      case "innovation":
        return "Zimbabwe becomes a global innovation super‑node, exporting advanced technologies.";
      case "culture":
        return "A cultural renaissance flourishes, blending heritage with futuristic expression.";
      case "economy":
        return "A resilient, diversified, green economy leads Africa’s economic transformation.";
      case "ethics":
        return "Ethical governance becomes a national identity, admired worldwide.";
      case "youth":
        return "Future generations become global leaders in science, arts, and cosmic studies.";
      case "cosmic":
        return "Zimbabwe aligns with universal principles, becoming a beacon of cosmic harmony.";
      default:
        return "Unknown axis.";
    }
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ 100‑Year Civilization Vision ✦</h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card"><h3 className="pdf-title">Innovation</h3><p>{vision("innovation")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Culture</h3><p>{vision("culture")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Economy</h3><p>{vision("economy")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Ethics</h3><p>{vision("ethics")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Youth</h3><p>{vision("youth")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Cosmic Alignment</h3><p>{vision("cosmic")}</p></div>
      </div>
    </div>
  );
}
