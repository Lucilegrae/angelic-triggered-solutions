"use client";

import { useEffect, useState } from "react";

export default function CivilizationTrajectoryEngine() {
  const [status, setStatus] = useState("Initializing…");

  useEffect(() => {
    setStatus("ATS Civilization Trajectory Active");
  }, []);

  function project(axis) {
    switch (axis) {
      case "innovation":
        return "Zimbabwe enters continental leadership in AI, biotech, and green energy.";
      case "culture":
        return "Cultural fusion accelerates, heritage strengthens, global influence expands.";
      case "economy":
        return "Exports rise, mining modernizes, agriculture becomes climate‑adaptive.";
      case "ethics":
        return "Integrity systems strengthen, corruption collapses, transparency becomes standard.";
      case "youth":
        return "Youth drive national transformation through digital skills and innovation.";
      case "cosmic":
        return "ATS aligns national development with cosmic harmony and universal principles.";
      default:
        return "Unknown trajectory axis.";
    }
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Civilization Trajectory Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card"><h3 className="pdf-title">Innovation</h3><p>{project("innovation")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Culture</h3><p>{project("culture")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Economy</h3><p>{project("economy")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Ethics</h3><p>{project("ethics")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Youth</h3><p>{project("youth")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Cosmic Alignment</h3><p>{project("cosmic")}</p></div>
      </div>
    </div>
  );
}
