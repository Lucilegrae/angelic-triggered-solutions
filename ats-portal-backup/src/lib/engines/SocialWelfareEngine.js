"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function SocialWelfareEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("social_welfare")
        .select("*")
        .order("vulnerable_households", { ascending: false });

      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Social Welfare Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Vulnerable Households: {r.vulnerable_households}</p>
            <p>Food Aid Distributed: {r.food_aid}</p>
            <p>Cash Transfers: ${r.cash_transfers}</p>
            <p>ATS Welfare Team: {r.ats_welfare_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
