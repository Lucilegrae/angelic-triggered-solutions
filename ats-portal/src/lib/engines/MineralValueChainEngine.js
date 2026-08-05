"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function MineralValueChainEngine() {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("mineral_value_chain")
        .select("*")
        .order("mineral", { ascending: true });

      setChain(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Mineral Value Chain Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {chain.map((c) => (
          <div key={c.id} className="pdf-card">
            <h3 className="pdf-title">{c.mineral}</h3>
            <p>Stage: {c.stage}</p>
            <p>Cost: ${c.cost}</p>
            <p>ATS Verified: {c.ats_verified ? "✔️ Yes" : "⚠️ Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
