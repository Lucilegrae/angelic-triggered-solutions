"use client";

import { useEffect, useState } from "react";
import {
  listStakeholderAlignment,
  listCommunityUpliftment,
  listLandAllocations,
  listConstructionProjects,
  listCommunityDevelopment
} from "./supabaseClient";

function AlignmentBar({ label, value }) {
  const pct = Math.min(100, Math.round(value));
  return (
    <div className="mb-3">
      <p className="text-sm mb-1">{label}: {pct}%</p>
      <div className="w-full bg-slate-800 h-2 rounded">
        <div
          className="bg-emerald-500 h-2 rounded"
          style={{ width: pct + "%" }}
        />
      </div>
    </div>
  );
}

export default function StakeholderCosmicAlignmentEngine() {
  const [stakeholders, setStakeholders] = useState([]);
  const [selected, setSelected] = useState(null);

  const [upliftment, setUpliftment] = useState([]);
  const [land, setLand] = useState([]);
  const [construction, setConstruction] = useState([]);
  const [development, setDevelopment] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listStakeholderAlignment();
      setStakeholders(data || []);
      if (data && data.length > 0) setSelected(data[0]);

      const uplift = await listCommunityUpliftment();
      setUpliftment(uplift.data || []);

      const landData = await listLandAllocations();
      setLand(landData.data || []);

      const cons = await listConstructionProjects();
      setConstruction(cons.data || []);

      const dev = await listCommunityDevelopment();
      setDevelopment(dev.data || []);
    })();
  }, []);

  function computeAlignment(s) {
    const legitimacy = s.legitimacy_score || 0;
    const upliftmentScore = s.upliftment_score || 0;
    const blessings = s.blessings_count || 0;
    const compliance = s.compliance_count || 0;
    const mechanisation = s.mechanisation_count || 0;

    const arcs = {
      legitimacy,
      upliftment: upliftmentScore,
      blessings: blessings * 2,
      compliance,
      mechanisation
    };

    const max = 100;
    const norm = Object.fromEntries(
      Object.entries(arcs).map(([k, v]) => [
        k,
        Math.min(100, (v / max) * 100)
      ])
    );

    const cosmic =
      (norm.legitimacy * 0.25 +
        norm.upliftment * 0.25 +
        norm.blessings * 0.2 +
        norm.compliance * 0.15 +
        norm.mechanisation * 0.15) /
      100;

    return { norm, cosmic: Math.round(cosmic * 100) };
  }

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">
        ✦ Stakeholder Cosmic Alignment Engine ✦
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
            <h3 className="pdf-title">
              Cosmic Alignment — {selected.name}
            </h3>

            {(() => {
              const { norm, cosmic } = computeAlignment(selected);
              return (
                <>
                  <AlignmentBar label="Legitimacy Alignment" value={norm.legitimacy} />
                  <AlignmentBar label="Upliftment Alignment" value={norm.upliftment} />
                  <AlignmentBar label="Blessings Alignment" value={norm.blessings} />
                  <AlignmentBar label="Compliance Alignment" value={norm.compliance} />
                  <AlignmentBar label="Mechanisation Alignment" value={norm.mechanisation} />

                  <div className="mt-4">
                    <h3 className="pdf-title">Cosmic Alignment Index: {cosmic}%</h3>
                    <p className="text-sm text-slate-400">
                      Composite alignment across all governance arcs.
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="pdf-title">Community Upliftment Impact</h3>
                    <p className="text-sm text-slate-400">
                      Communities uplifted: {upliftment.length}
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="pdf-title">Land Allocation Influence</h3>
                    <p className="text-sm text-slate-400">
                      Land allocations: {land.length}
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="pdf-title">ATS Construction Influence</h3>
                    <p className="text-sm text-slate-400">
                      Active projects: {construction.length}
                    </p>
                  </div>

                  <div className="mt-6">
                    <h3 className="pdf-title">Community Development Influence</h3>
                    <p className="text-sm text-slate-400">
                      Development records: {development.length}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
