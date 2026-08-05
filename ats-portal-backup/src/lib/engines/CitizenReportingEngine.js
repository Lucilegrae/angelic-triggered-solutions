"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function CitizenReportingEngine() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("citizen_reports")
        .select("*")
        .order("created_at", { ascending: false });

      setReports(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Citizen Reporting Engine ✦</h2>

      <div className="pdf-dashboard-grid">
        {reports.map((r) => (
          <div key={r.id} className="pdf-card">
            <h3 className="pdf-title">{r.report_type}</h3>
            <p>{r.message}</p>
            <p>Community: {r.community_name}</p>
            <p>Phone: {r.phone_number}</p>
            <p>Time: {new Date(r.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
