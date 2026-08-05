"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function LogisticsSupplyChainEngine() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("logistics_supply_chain")
        .select("*")
        .order("throughput", { ascending: false });

      setNodes(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Logistics & Supply Chain Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {nodes.map((n) => (
          <div key={n.id} className="pdf-card">
            <h3 className="pdf-title">{n.node_name}</h3>
            <p>Type: {n.node_type}</p>
            <p>Province: {n.province}</p>
            <p>Throughput: {n.throughput}</p>
            <p>Bottleneck: {n.bottleneck ? "⚠️ Yes" : "✔️ No"}</p>
            <p>ATS Logistics Team: {n.ats_logistics_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
