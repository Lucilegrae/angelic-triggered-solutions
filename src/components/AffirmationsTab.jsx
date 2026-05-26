import React, { useState, useEffect } from "react";
import { supabase } from ".../supabaseClient";
import "./../theme.css";

export default function AffirmationsTab({ affirmations, stakeholderId }) {
  const [dateFilter, setDateFilter] = useState("2026-04-01");
  const [arcKeyword, setArcKeyword] = useState("covenant");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function applyFilters() {
      let query = supabase.from("affirmations").select("*");

      if (dateFilter) {
        query = query.gt("created_at", dateFilter);
      }
      if (arcKeyword) {
        query = query.like("ceremonial_arc", `%${arcKeyword}%`);
      }
      if (stakeholderId) {
        query = query.eq("stakeholder_id", stakeholderId);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (!error) {
        setFiltered(data);
      }
    }

    applyFilters();
  }, [affirmations, stakeholderId, dateFilter, arcKeyword]);

  return (
    <div>
      <h2 className="aura-heading">Affirmations</h2>

      {/* ✦ Filter Controls ✦ */}
      <div className="aura-form glyph-card" style={{ marginBottom: "1rem" }}>
        <label>
          Date Filter:
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </label>
        <label>
          Arc Keyword:
          <input
            type="text"
            value={arcKeyword}
            onChange={(e) => setArcKeyword(e.target.value)}
          />
        </label>
      </div>

      {/* ✦ Filtered Results ✦ */}
      <div className="aura-grid">
        {filtered.length === 0 && <p>No affirmations found.</p>}
        {filtered.map((a) => (
          <div key={a.id} className={`glyph-card ${a.animate ? "aura-fade" : ""}`}>
            <h3 className="slogan-arc aura-heading">{a.slogan}</h3>
            <p style={{ opacity: 0.8 }}>{a.ceremonial_arc}</p>
            <p style={{ fontSize: "12px", opacity: 0.7 }}>
              {new Date(a.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
