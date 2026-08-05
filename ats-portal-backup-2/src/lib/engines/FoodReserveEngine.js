"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function FoodReserveEngine() {
  const [silos, setSilos] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("food_reserves")
        .select("*")
        .order("stock_tonnage", { ascending: false });

      setSilos(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Food Reserve & Strategic Grain Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {silos.map((s) => (
          <div key={s.id} className="pdf-card">
            <h3 className="pdf-title">{s.silo_name}</h3>
            <p>Province: {s.province}</p>
            <p>Grain Type: {s.grain_type}</p>
            <p>Stock: {s.stock_tonnage} tons</p>
            <p>Spoilage Rate: {s.spoilage_rate}%</p>
            <p>ATS Food Team: {s.ats_food_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
