"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CensusDemographicsEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("census_demographics")
        .select("*")
        .order("population", { ascending: false });

      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Census & Demographics Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Population: {r.population}</p>
            <p>Households: {r.households}</p>
            <p>Median Age: {r.median_age}</p>
            <p>Migration In: {r.migration_in}</p>
            <p>Migration Out: {r.migration_out}</p>
            <p>ATS Demographics Team: {r.ats_demographics_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
