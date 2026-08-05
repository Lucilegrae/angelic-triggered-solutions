"use client";

import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import BlessingsTimeline from "./BlessingsTimeline";

export default function BlessingsDashboard() {
  const [stakeholders, setStakeholders] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("stakeholders").select("*");
      setStakeholders(data || []);
      if (data && data.length > 0) setSelected(data[0]);
    })();
  }, []);

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ Blessings Intelligence ✦</h2>

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
            <h3 className="pdf-title">Blessings for {selected.name}</h3>
            <BlessingsTimeline stakeholderId={selected.id} />
          </div>
        )}
      </div>
    </div>
  );
}
