"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function PopulationForecastEngine() {
  const [demo, setDemo] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("census_demographics")
        .select("*");

      setDemo(data || []);
    })();
  }, []);

  function forecast() {
    const totalPop = demo.reduce((a, b) => a + (b.population || 0), 0);
    const migrationIn = demo.reduce((a, b) => a + (b.migration_in || 0), 0);
    const migrationOut = demo.reduce((a, b) => a + (b.migration_out || 0), 0);

    const netGrowth = totalPop * 0.012 + (migrationIn - migrationOut);

    return {
      current_population: totalPop,
      projected_10yr: Math.round(totalPop + netGrowth * 10),
      projected_20yr: Math.round(totalPop + netGrowth * 20)
    };
  }

  const f = forecast();

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Population Growth Forecast Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card"><h3 className="pdf-title">Current Population</h3><p>{f.current_population}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">10‑Year Projection</h3><p>{f.projected_10yr}</p></div>
        <div className="pdf-card"><h3 className="pdf-title">20‑Year Projection</h3><p>{f.projected_20yr}</p></div>
      </div>
    </div>
  );
}
