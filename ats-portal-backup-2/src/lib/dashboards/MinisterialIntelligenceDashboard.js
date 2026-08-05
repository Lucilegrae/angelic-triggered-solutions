"use client";

import { useEffect, useState } from "react";
import {
  listCommunityUpliftment,
  listLandAllocations,
  listConstructionProjects,
  listCommunityDevelopment,
  listStakeholderAlignment
} from "./supabaseClient";

export default function MinisterialIntelligenceDashboard() {
  const [uplift, setUplift] = useState([]);
  const [land, setLand] = useState([]);
  const [construction, setConstruction] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [alignment, setAlignment] = useState([]);

  useEffect(() => {
    (async () => {
      setUplift((await listCommunityUpliftment()).data || []);
      setLand((await listLandAllocations()).data || []);
      setConstruction((await listConstructionProjects()).data || []);
      setDevelopment((await listCommunityDevelopment()).data || []);
      setAlignment((await listStakeholderAlignment()).data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Ministerial Intelligence Dashboard ✦</h2>

      <div className="pdf-dashboard-grid">

        <div className="pdf-card">
          <h3 className="pdf-title">Ministry of Community Upliftment</h3>
          <p>Total Communities: {uplift.length}</p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Ministry of Lands</h3>
          <p>Total Allocations: {land.length}</p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Ministry of Construction</h3>
          <p>Active Projects: {construction.length}</p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Ministry of Community Development</h3>
          <p>Development Records: {development.length}</p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Ministry of Governance & Stakeholders</h3>
          <p>Stakeholders: {alignment.length}</p>
        </div>

      </div>
    </div>
  );
}
