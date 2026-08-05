"use client";

import { useEffect, useState } from "react";
import {
  listCommunityUpliftment,
  listCommunityDevelopment,
  listLandAllocations,
  listConstructionProjects,
  listStakeholderAlignment
} from "./supabaseClient";

export default function NationalKPIEngine() {
  const [uplift, setUplift] = useState([]);
  const [dev, setDev] = useState([]);
  const [land, setLand] = useState([]);
  const [cons, setCons] = useState([]);
  const [align, setAlign] = useState([]);

  useEffect(() => {
    (async () => {
      setUplift((await listCommunityUpliftment()).data || []);
      setDev((await listCommunityDevelopment()).data || []);
      setLand((await listLandAllocations()).data || []);
      setCons((await listConstructionProjects()).data || []);
      setAlign((await listStakeholderAlignment()).data || []);
    })();
  }, []);

  const KPIs = [
    {
      name: "Water Access",
      value: uplift.filter((u) => u.water_access).length,
      total: uplift.length,
    },
    {
      name: "Sanitation Access",
      value: uplift.filter((u) => u.sanitation_access).length,
      total: uplift.length,
    },
    {
      name: "Construction Progress",
      value: cons.reduce((a, b) => a + (b.progress || 0), 0),
      total: cons.length * 100,
    },
    {
      name: "Land Allocation Completed",
      value: land.filter((l) => l.allocation_status === "completed").length,
      total: land.length,
    },
    {
      name: "Stakeholder Legitimacy",
      value: align.reduce((a, b) => a + (b.legitimacy_score || 0), 0),
      total: align.length * 100,
    },
  ];

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS National KPI Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {KPIs.map((k) => (
          <div key={k.name} className="pdf-card">
            <h3 className="pdf-title">{k.name}</h3>
            <p>
              {Math.round((k.value / (k.total || 1)) * 100)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
