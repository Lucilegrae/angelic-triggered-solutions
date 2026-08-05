"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ElectionsIntelligenceEngine() {
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("elections_intelligence")
        .select("*")
        .order("turnout", { ascending: false });

      setConstituencies(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Elections Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {constituencies.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.constituency}</h3>
            <p>Registered Voters: {c.registered_voters}</p>
            <p>Turnout: {c.turnout}</p>
            <p>Leading Candidate: {c.leading_candidate}</p>
            <p>ATS Observer Team: {c.ats_observer_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
