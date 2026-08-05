"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function ParliamentIntelligenceEngine() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("parliament_intelligence")
        .select("*")
        .order("updated_at", { ascending: false });

      setBills(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Parliament Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {bills.map((b) => (
          <div key={b.id} className="pdf-card">
            <h3 className="pdf-title">{b.bill_title}</h3>
            <p>Committee: {b.committee}</p>
            <p>Stage: {b.stage}</p>
            <p>Votes For: {b.votes_for}</p>
            <p>Votes Against: {b.votes_against}</p>
            <p>ATS Analysis: {b.ats_analysis}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
