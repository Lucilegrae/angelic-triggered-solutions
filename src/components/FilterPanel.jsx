import React from "react";
import "./../theme.css";

export default function FilterPanel({
  stakeholderInput,
  setStakeholderInput,
  dateInput,
  setDateInput,
  arcInput,
  setArcInput,
  roleFilter,
  setRoleFilter,
  emailKeyword,
  setEmailKeyword,
}) {
  return (
    <div className="aura-form glyph-card" style={{ marginBottom: "1rem" }}>
      <h3 className="slogan-arc aura-heading">✦ Unified Filters ✦</h3>

      {/* Projects / Affirmations Filters */}
      <label>
        Stakeholder ID:
        <input
          type="number"
          value={stakeholderInput}
          onChange={(e) => setStakeholderInput(Number(e.target.value))}
        />
      </label>
      <label>
        Date Filter:
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
      </label>
      <label>
        Arc Keyword:
        <input
          type="text"
          value={arcInput}
          onChange={(e) => setArcInput(e.target.value)}
        />
      </label>

      {/* Stakeholders Filters */}
      <label>
        Role Filter:
        <input
          type="text"
          placeholder="Enter role"
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
  );
}
