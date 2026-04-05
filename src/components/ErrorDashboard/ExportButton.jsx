import React from "react";
import { logAuditTrail } from "./LogAuditTrail";
import { exportCSV } from "./exportUtils"; // assumes you already have this utility

function ExportButton({ user, errors }) {
  const handleExport = async () => {
    try {
      // Run your existing CSV export logic
      await exportCSV(errors);

      // Log the action into Supabase audit_trail
      await logAuditTrail(user, errors);
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    <button
      onClick={handleExport}
      style={{
        margin: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#4A90E2",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Export CSV
    </button>
  );
}

export default ExportButton;
