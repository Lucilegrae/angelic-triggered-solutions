import React from "react";
import { exportCSV, exportPNG } from "./exportUtils";

export default function Filters({ filters, setFilters, errors }) {
  return (
    <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", justifyContent: "center" }}>
      <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
      <input type="text" placeholder="Filter by component" value={filters.component}
        onChange={(e) => setFilters({ ...filters, component: e.target.value })} />
      <select value={filters.severity} onChange={(e) => setFilters({ ...filters, severity: e.target.value })}>
        <option value="">All Severities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={() => exportCSV(errors)} style={{ backgroundColor: "#ff4d4d", color: "#fff", border: "none",
        padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Export CSV</button>
      <button onClick={exportPNG} style={{ backgroundColor: "#4d94ff", color: "#fff", border: "none",
        padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Export PNG</button>
    </div>
  );
}
