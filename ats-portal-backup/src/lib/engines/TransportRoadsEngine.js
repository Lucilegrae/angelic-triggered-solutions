"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function TransportRoadsEngine() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("transport_roads")
        .select("*")
        .order("traffic_volume", { ascending: false });

      setRoutes(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Transport & Roads Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {routes.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.route_name}</h3>
            <p>Province: {r.province}</p>
            <p>Condition: {r.road_condition}</p>
            <p>Traffic Volume: {r.traffic_volume}</p>
            <p>ATS Engineer: {r.ats_engineer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
