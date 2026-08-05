"use client";

import { useEffect, useState } from "react";
import {
  listCommunityDevelopment,
  listConstructionProjects,
  listCommunityUpliftment,
  listLandAllocations,
  listStakeholderAlignment
} from "./supabaseClient";

export default function NationalPolicySimulator() {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const dev = (await listCommunityDevelopment()).data || [];
      const cons = (await listConstructionProjects()).data || [];
      const uplift = (await listCommunityUpliftment()).data || [];
      const land = (await listLandAllocations()).data || [];
      const align = (await listStakeholderAlignment()).data || [];

      setState({ dev, cons, uplift, land, align });
    })();
  }, []);

  function simulateScenario(type) {
    if (!state) return "Loading…";

    switch (type) {
      case "economic_shock":
        return "GDP drops by 12%, mining output falls, ATS emergency economic measures activated.";
      case "climate_event":
        return "Rainfall decreases, drought index rises, ATS water & agriculture teams deployed.";
      case "mining_surge":
        return "Mining output increases by 18%, exports rise, ATS logistics teams scale operations.";
      case "population_growth":
        return "Population increases by 7%, housing & education demand rises.";
      default:
        return "Unknown scenario.";
    }
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National AI‑Driven Policy Simulator ✦</h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card">
          <h3 className="pdf-title">Economic Shock</h3>
          <p>{simulateScenario("economic_shock")}</p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Climate Event</h3>
          <p>{simulateScenario("climate_event")}</p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Mining Surge</h3>
          <p>{simulateScenario("mining_surge")}</p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Population Growth</h3>
          <p>{simulateScenario("population_growth")}</p>
        </div>
      </div>
    </div>
  );
}
