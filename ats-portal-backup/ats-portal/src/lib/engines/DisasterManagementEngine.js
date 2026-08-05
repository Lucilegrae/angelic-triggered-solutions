"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function DisasterManagementEngine() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("disaster_management")
        .select("*")
        .order("severity", { ascending: false });

      setEvents(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Disaster Management ✦</h2>

      <div className="pdf-dashboard-grid">
        {events.map((e) => (
          <div key={e.id} className="pdf-card">
            <h3 className="pdf-title">{e.disaster_type}</h3>
            <p>Community: {e.community_name}</p>
            <p>Severity: {e.severity}</p>
            <p>Affected Households: {e.affected_households}</p>
            <p>ATS Response Team: {e.ats_response_team}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
