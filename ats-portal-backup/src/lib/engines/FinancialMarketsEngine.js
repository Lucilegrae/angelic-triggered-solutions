"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function FinancialMarketsEngine() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("financial_markets")
        .select("*")
        .order("volatility", { ascending: false });

      setMarkets(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Financial Markets Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {markets.map((m) => (
          <div key={m.id} className="pdf-card">
            <h3 className="pdf-title">{m.market_name}</h3>
            <p>Index Value: {m.index_value}</p>
            <p>Daily Change: {m.daily_change}%</p>
            <p>Volatility: {m.volatility}</p>
            <p>ATS Financial Team: {m.ats_financial_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
