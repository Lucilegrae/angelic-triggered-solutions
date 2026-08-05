"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import StakeholderComplianceTimeline from "./StakeholderComplianceTimeline";
import StakeholderMechanisationTimeline from "./StakeholderMechanisationTimeline";
import BlessingsTimeline from "./BlessingsTimeline";

export default function GovernanceArcVisualizer() {
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

  function ArcBar({ label, value, max = 100 }) {
    const pct = Math.min(100, Math.round((value / max) * 100));
    return (
      <div className="mb-4">
        <p className="text-sm mb-1">{label}: {value}</p>
        <div className="w-full bg-slate-800 h-2 rounded">
          <div
            className="bg-emerald-500 h-2 rounded"
            style={{ width: pct + "%" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">
        ✦ Governance Arc Visualizer ✦
      </h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card">
          <h3 className="pdf-title">Stakeholders</h3>
          <ul className="text-sm">
            {stakeholders.map((s) => (
              <li
                key={s.id}
                className={`py-1 cursor-pointer ${
                  selected?.id === s.id ? "text-emerald-400" : "text-slate-200"
                }`}
                onClick={() => setSelected(s)}
              >
                {s.name}
              </li>
            ))}
          </ul>
        </div>

        {selected && (
          <div className="pdf-card">
            <h3 className="pdf-title">Governance Arcs — {selected.name}</h3>

            <ArcBar label="Legitimacy" value={selected.legitimacy_score || 0} />
            <ArcBar label="Upliftment" value={selected.upliftment_score || 0} />
            <ArcBar label="Blessings" value={selected.blessings_count || 0} max={50} />
            <ArcBar label="Progress Stage" value={(selected.progress_stage || 0) * 10} />
            <ArcBar label="Pledge Strength" value={(selected.pledge?.length || 0)} max={50} />

            <div className="mt-6">
              <h3 className="pdf-title">Compliance Timeline</h3>
              <StakeholderComplianceTimeline stakeholderId={selected.id} />
            </div>

            <div className="mt-6">
              <h3 className="pdf-title">Mechanisation Timeline</h3>
              <StakeholderMechanisationTimeline stakeholderId={selected.id} />
            </div>

            <div className="mt-6">
              <h3 className="pdf-title">Blessings Timeline</h3>
              <BlessingsTimeline stakeholderId={selected.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
