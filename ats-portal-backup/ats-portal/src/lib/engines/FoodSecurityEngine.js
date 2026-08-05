"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function FoodSecurityEngine() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("food_security")
        .select("*")
        .order("food_security_score", { ascending: true });

      setRecords(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Food Security Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {records.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.community_name}</h3>
            <p>Food Security Score: {r.food_security_score}</p>
            <p>Households: {r.households}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
