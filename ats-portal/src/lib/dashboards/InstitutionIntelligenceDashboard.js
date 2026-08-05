"use client";

import { useEffect, useState } from "react";
import { listInstitutions, getInstitutionStakeholders } from "./supabaseClient";
import StakeholderComplianceTimeline from "./StakeholderComplianceTimeline";
import StakeholderMechanisationTimeline from "./StakeholderMechanisationTimeline";
import BlessingsTimeline from "./BlessingsTimeline";

export default function InstitutionIntelligenceDashboard() {
  const [institutions, setInstitutions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [stakeholders, setStakeholders] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listInstitutions();
      setInstitutions(data || []);
      if (data && data.length > 0) setSelected(data[0]);
    })();
  }, []);

  useEffect(() => {
    if (!selected) return;
    (async () => {
      const { data } = await getInstitutionStakeholders(selected.id);
      setStakeholders(data || []);
    })();
  }, [selected]);

  function ScoreBar({ label, value, max = 100 }) {
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
        ✦ Institution Intelligence Dashboard ✦
      </h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card">
          <h3 className="pdf-title">Institutions</h3>
          <ul className="text-sm">
            {institutions.map((i) => (
              <li
                key={i.id}
                className={`py-1 cursor-pointer ${
                  selected?.id === i.id ? "text-emerald-400" : "text-slate-200"
                }`}
                onClick={() => setSelected(i)}
              >
                {i.name}
              </li>
            ))}
          </ul>
        </div>

        {selected && (
          <div className="pdf-card">
            <h3 className="pdf-title">{selected.name}</h3>
            <p>Sector: {selected.sector}</p>
            <p>Description: {selected.description}</p>

            <ScoreBar label="Legitimacy" value={selected.legitimacy_score || 0} />
            <ScoreBar label="Upliftment" value={selected.upliftment_score || 0} />

            <h3 className="pdf-title mt-6">Stakeholders</h3>
            <ul className="text-sm mb-4">
              {stakeholders.map((s) => (
                <li key={s.id} className="py-1 text-slate-200">
                  {s.name} — Upliftment: {s.upliftment_score}
                </li>
              ))}
            </ul>

            {stakeholders.map((s) => (
              <div key={s.id} className="mt-6">
                <h3 className="pdf-title">{s.name} — Intelligence</h3>

                <StakeholderComplianceTimeline stakeholderId={s.id} />
                <StakeholderMechanisationTimeline stakeholderId={s.id} />
                <BlessingsTimeline stakeholderId={s.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
