"use client";

import { useEffect, useState } from "react";

export default function CrisisWargameSimulator() {
  const [scenario, setScenario] = useState("Loading…");

  useEffect(() => {
    setScenario("ATS Strategic Simulation Ready");
  }, []);

  function simulate(type) {
    switch (type) {
      case "border_conflict":
        return "ATS deploys rapid response units, activates satellite surveillance, stabilizes border sectors.";
      case "cyber_attack":
        return "ATS cyber command isolates networks, restores critical infrastructure, neutralizes threat.";
      case "economic_collapse":
        return "ATS activates emergency fiscal buffers, stabilizes markets, deploys national logistics support.";
      case "natural_disaster":
        return "ATS coordinates defence, health, logistics, and welfare teams for rapid national response.";
      default:
        return "Unknown scenario.";
    }
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Crisis War‑Game Simulator ✦</h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card"><h3 className="pdf-title">Border Conflict</h3><p>{simulate("border_conflict")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Cyber Attack</h3><p>{simulate("cyber_attack")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Economic Collapse</h3><p>{simulate("economic_collapse")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Natural Disaster</h3><p>{simulate("natural_disaster")}</p></div>
      </div>
    </div>
  );
}
