"use client";

import { useEffect, useState } from "react";
import {
  listCommunityUpliftment,
  listLandAllocations,
  listConstructionProjects,
  listCommunityDevelopment,
  listStakeholderAlignment
} from "./supabaseClient";

export default function ProvincialIntelligenceDashboard() {
  const [provinceData, setProvinceData] = useState({});

  useEffect(() => {
    (async () => {
      const uplift = (await listCommunityUpliftment()).data || [];
      const land = (await listLandAllocations()).data || [];
      const cons = (await listConstructionProjects()).data || [];
      const dev = (await listCommunityDevelopment()).data || [];
      const align = (await listStakeholderAlignment()).data || [];

      const provinces = {};

      function addToProvince(list, key) {
        list.forEach((item) => {
          const p = item.province || "Unknown";
          provinces[p] = provinces[p] || {
            uplift: 0,
            land: 0,
            cons: 0,
            dev: 0,
            align: 0,
          };
          provinces[p][key]++;
        });
      }

      addToProvince(uplift, "uplift");
      addToProvince(land, "land");
      addToProvince(cons, "cons");
      addToProvince(dev, "dev");
      addToProvince(align, "align");

      setProvinceData(provinces);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Provincial Intelligence Dashboard ✦</h2>

      <div className="pdf-dashboard-grid">
        {Object.entries(provinceData).map(([province, stats]) => (
          <div key={province} className="pdf-card">
            <h3 className="pdf-title">{province}</h3>
            <p>Upliftment: {stats.uplift}</p>
            <p>Land Allocations: {stats.land}</p>
            <p>Construction Projects: {stats.cons}</p>
            <p>Development Records: {stats.dev}</p>
            <p>Stakeholders: {stats.align}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
