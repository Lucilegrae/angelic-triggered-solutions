import React from "react";
import html2canvas from "html2canvas";
import { logAuditTrail } from "./LogAuditTrail";

function ExportPNG({ user, errors }) {
  const handleExport = async () => {
    try {
      // Capture the dashboard section as PNG
      const dashboard = document.querySelector("section"); // adjust selector if needed
      const canvas = await html2canvas(dashboard);
      const link = document.createElement("a");
      link.download = "error_dashboard.png";
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Log the action into Supabase audit_trail
      await logAuditTrail(user, errors, "EXPORT_PNG");
    } catch (err) {
      console.error("PNG export failed:", err);
    }
  };

  return (
    <button
      onClick={handleExport}
      style={{
        margin: "1rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#50E3C2",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Export PNG
    </button>
  );
}

export default ExportPNG;
