import React from "react";

export default function KPIPanel({ errors }) {
  const totalErrors = errors.length;
  const today = new Date().toISOString().split("T")[0];
  const todayErrors = errors.filter(
    (err) => new Date(err.created_at).toISOString().split("T")[0] === today
  ).length;
  const severityCounts = errors.reduce((acc, err) => {
    const sev = err.severity || "Medium";
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {});
  const highSeverity = severityCounts["High"] || 0;
  const highSeverityPercent = totalErrors > 0 ? ((highSeverity / totalErrors) * 100).toFixed(1) : 0;

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
      <div style={{ background: "#222", padding: "1rem 2rem", borderRadius: "8px", color: "#fff" }}>
        <h3>Total Errors</h3><p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{totalErrors}</p>
      </div>
      <div style={{ background: "#222", padding: "1rem 2rem", borderRadius: "8px", color: "#fff" }}>
        <h3>Errors Today</h3><p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{todayErrors}</p>
      </div>
      <div style={{ background: "#222", padding: "1rem 2rem", borderRadius: "8px", color: "#fff" }}>
        <h3>High Severity %</h3>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ff4d4d" }}>{highSeverityPercent}%</p>
      </div>
    </div>
  );
}
