"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function EducationIntelligenceEngine() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("national_education")
        .select("*")
        .order("pass_rate", { ascending: false });

      setSchools(data || []);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ National Education Intelligence ✦</h2>

      <div className="pdf-dashboard-grid">
        {schools.map((s) => (
          <div key={s.id} className="pdf-card">
            <h3 className="pdf-title">{s.school_name}</h3>
            <p>Community: {s.community_name}</p>
            <p>Teachers: {s.teachers}</p>
            <p>Students: {s.students}</p>
            <p>Pass Rate: {s.pass_rate}%</p>
            <p>ATS Support: {s.ats_support}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
