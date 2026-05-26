import React, { useState, useEffect } from "react";
import { supabase } from ".../supabaseClient";
import "./../theme.css";

export default function StakeholdersTab({ stakeholders }) {
  const [roleFilter, setRoleFilter] = useState("");
  const [emailKeyword, setEmailKeyword] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function applyFilters() {
      let query = supabase.from("stakeholders").select("*");

      if (roleFilter) {
        query = query.eq("role", roleFilter);
      }
      if (emailKeyword) {
        query = query.like("email", `%${emailKeyword}%`);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (!error) {
        setFiltered(data);
      }
    }

    applyFilters();
  }, [stakeholders, roleFilter, emailKeyword]);

  return (
    <div>
      <h2 className="aura-heading">Stakeholders</h2>

      {/* ✦ Filter Controls ✦ */}
      <div className="aura-form glyph-card" style={{ marginBottom: "1rem" }}>
        <label>
          Role Filter:
          <input
            type="text"
            placeholder="Enter role (e.g. Manager)"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </label>
        <label>
          Email Keyword:
          <input
            type="text"
            placeholder="Search email"
            value={emailKeyword}
            onChange={(e) => setEmailKeyword(e.target.value)}
          />
        </label>
      </div>

      {/* ✦ Filtered Results ✦ */}
      <div className="aura-grid">
        {filtered.length === 0 && <p>No stakeholders found.</p>}
        {filtered.map((s) => (
          <div key={s.id} className={`glyph-card ${s.animate ? "aura-fade" : ""}`}>
            <h3 className="aura-heading">{s.name}</h3>
            <p style={{ fontStyle: "italic", opacity: 0.8 }}>Role: {s.role}</p>
            <p style={{ fontSize: "12px", opacity: 0.7 }}>{s.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
