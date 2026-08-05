"use client";

import { useEffect, useState } from "react";

export default function LeadershipSupportEngine() {
  const [status, setStatus] = useState("Initializing…");

  useEffect(() => {
    setStatus("ATS Leadership Support Active");
  }, []);

  function advise(topic) {
    switch (topic) {
      case "economy":
        return "ATS recommends stabilizing inflation, boosting exports, and accelerating innovation clusters.";
      case "health":
        return "ATS recommends expanding clinics, increasing vaccination, and deploying mobile health units.";
      case "infrastructure":
        return "ATS recommends prioritizing roads, energy grid upgrades, and water security.";
      case "governance":
        return "ATS recommends automation of approvals, transparency dashboards, and rapid reporting.";
      default:
        return "Unknown leadership domain.";
    }
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Leadership Support Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card"><h3 className="pdf-title">Economy</h3><p>{advise("economy")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Health</h3><p>{advise("health")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Infrastructure</h3><p>{advise("infrastructure")}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">Governance</h3><p>{advise("governance")}</p></div>
      </div>
    </div>
  );
}
