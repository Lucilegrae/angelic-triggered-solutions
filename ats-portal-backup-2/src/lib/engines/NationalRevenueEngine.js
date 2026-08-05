"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function NationalRevenueEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("national_revenue")
        .select("*")
        .order("amount", { ascending: false });

      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Revenue Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.revenue_source}</h3>
            <p>Amount: ${r.amount}</p>
            <p>Period: {r.period}</p>
            <p>ATS Verified: {r.ats_verified ? "✔️ Yes" : "⚠️ Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
