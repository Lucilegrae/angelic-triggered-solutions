"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import StakeholderComplianceTimeline from "./StakeholderComplianceTimeline";
import StakeholderMechanisationTimeline from "./StakeholderMechanisationTimeline";

export default function StakeholderIntelligenceMasterDashboard() {
  const [stakeholders, setStakeholders] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("stakeholders")
        .select("*")
        .order("upliftment_score", { ascending: false });

      setStakeholders(data || []);
      if (data && data.length > 0) setSelected(data[0]);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">
        ✦ Stakeholder Intelligence Master Dashboard ✦
      </h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card">
          <h3 className="pdf-title">Stakeholder Rankings</h3>
          <ul className="text-sm">
            {stakeholders.map((s) => (
              <li
                key={s.id}
                className={`py-1 cursor-pointer ${
                  selected?.id === s.id ? "text-emerald-400" : "text-slate-200"
                }`}
                onClick={() => setSelected(s)}
              >
                {s.name} — Upliftment: {s.upliftment_score} — Legitimacy:{" "}
                {s.legitimacy_score}
              </li>
            ))}
          </ul>
        </div>

        {selected && (
          <div className="pdf-card">
            <h3 className="pdf-title">Selected Stakeholder</h3>
            <p>Name: {selected.name}</p>
            <p>Email: {selected.email}</p>
            <p>Role: {selected.role}</p>
            <p>Sector: {selected.sector}</p>
            <p>Legitimacy: {selected.legitimacy_score}</p>
            <p>Upliftment: {selected.upliftment_score}</p>

            <div style={{ marginTop: "1rem" }}>
              <StakeholderComplianceTimeline stakeholderId={selected.id} />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <StakeholderMechanisationTimeline stakeholderId={selected.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
