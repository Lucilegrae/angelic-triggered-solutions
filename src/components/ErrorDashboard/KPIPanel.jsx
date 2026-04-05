import React, { useEffect } from "react";
import { logAuditTrail } from "./LogAuditTrail";

export default function KPIPanel({ errors, user }) {
  const totalErrors = errors.length;
  const severityCounts = errors.reduce((acc, err) => {
    const sev = err.severity || "Medium";
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {});

  useEffect(() => {
    if (errors.length > 0) {
      // Log KPI recalculation into audit_trail
      logAuditTrail(
        user,
        errors,
        "KPI_REFRESH",
        {
          totalErrors,
          severityDistribution: severityCounts
        }
      );
    }
  }, [errors, user]);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>KPI Panel</h2>
      <p><strong>Total Errors:</strong> {totalErrors}</p>
      {Object.entries(severityCounts).map(([severity, count]) => (
        <p key={severity}><strong>{severity}:</strong> {count}</p>
      ))}
    </div>
  );
}
