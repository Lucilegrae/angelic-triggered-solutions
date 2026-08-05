"use client";

import { useEffect, useState } from "react";
import { listSectorIntelligence } from "./supabaseClient";

export default function SectorIntelligenceDashboard() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await listSectorIntelligence();
      const map = new Map();

      (data || []).forEach((row) => {
        const key = row.sector || "Unknown";
        const current = map.get(key) || {
          sector: key,
          legitimacy: 0,
          upliftment: 0,
          blessings: 0,
          count: 0,
        };

        current.legitimacy += row.legitimacy_score || 0;
        current.upliftment += row.upliftment_score || 0;
        current.blessings += row.blessings_count || 0;
        current.count += 1;

        map.set(key, current);
      });

      setSectors(Array.from(map.values()));
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">
        ✦ Sector Intelligence Dashboard ✦
      </h2>

      <div className="pdf-dashboard-grid">
        {sectors.map((s) => (
          <div key={s.sector} className="pdf-card">
            <h3 className="pdf-title">{s.sector}</h3>
            <p>Stakeholders: {s.count}</p>
            <p>Total Legitimacy: {s.legitimacy}</p>
            <p>Total Upliftment: {s.upliftment}</p>
            <p>Total Blessings: {s.blessings}</p>

            <div className="mt-4">
              <div className="mb-2">
                <p className="text-sm mb-1">Legitimacy Intensity</p>
                <div className="w-full bg-slate-800 h-2 rounded">
                  <div
                    className="bg-emerald-500 h-2 rounded"
                    style={{
                      width:
                        Math.min(100, (s.legitimacy / (s.count || 1)) || 0) +
                        "%",
                    }}
                  />
                </div>
              </div>

              <div className="mb-2">
                <p className="text-sm mb-1">Upliftment Intensity</p>
                <div className="w-full bg-slate-800 h-2 rounded">
                  <div
                    className="bg-sky-500 h-2 rounded"
                    style={{
                      width:
                        Math.min(100, (s.upliftment / (s.count || 1)) || 0) +
                        "%",
                    }}
                  />
                </div>
              </div>

              <div className="mb-2">
                <p className="text-sm mb-1">Blessings Intensity</p>
                <div className="w-full bg-slate-800 h-2 rounded">
                  <div
                    className="bg-violet-500 h-2 rounded"
                    style={{
                      width:
                        Math.min(100, (s.blessings / (s.count || 1)) || 0) +
                        "%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
