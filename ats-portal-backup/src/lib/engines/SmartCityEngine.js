"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function SmartCityEngine() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("smart_city")
        .select("*")
        .order("iot_devices", { ascending: false });

      setCities(data || []);
    })();
  }, []);

  function optimize(city) {
    const { traffic_index, energy_efficiency, water_efficiency } = city;

    if (traffic_index > 70) return "Deploy ATS traffic AI and smart‑signals.";
    if (energy_efficiency < 40) return "Upgrade to ATS smart‑grid systems.";
    if (water_efficiency < 50) return "Deploy ATS water‑leak detection sensors.";
    return "City stable — maintain monitoring.";
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Smart‑City Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {cities.map((city) => (
          <div key={city.id} className="pdf-card">
            <h3 className="pdf-title">{city.city_name}</h3>
            <p>IoT Devices: {city.iot_devices}</p>
            <p>Traffic Index: {city.traffic_index}</p>
            <p>Energy Efficiency: {city.energy_efficiency}</p>
            <p>Water Efficiency: {city.water_efficiency}</p>
            <p>ATS Smart‑City Team: {city.ats_smartcity_team}</p>
            <p>Optimization: {optimize(city)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
