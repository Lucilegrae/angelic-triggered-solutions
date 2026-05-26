import React from "react";
import { supabase } from ".../supabaseClient";
import "./../theme.css";

export default function AuditExport() {
  async function exportCSV() {
    const { data, error } = await supabase
      .from("audit_trail")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Export failed:", error.message);
      return;
    }

    const rows = data.map((log) => ({
      id: log.id,
      action: log.action,
      details: JSON.stringify(log.details),
      timestamp: log.timestamp,
    }));

    const header = Object.keys(rows[0]).join(",");
    const csv = [
      header,
      ...rows.map((r) => Object.values(r).map((v) => `"${v}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "audit_trail.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function exportPDF() {
    const { data, error } = await supabase
      .from("audit_trail")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Export failed:", error.message);
      return;
    }

    // Simple PDF export using jsPDF
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Audit Trail Logs", 10, 10);

    let y = 20;
    data.forEach((log) => {
      doc.text(
        `${log.timestamp} | ${log.action} | ${JSON.stringify(log.details)}`,
        10,
        y
      );
      y += 10;
    });

    doc.save("audit_trail.pdf");
  }

  return (
    <div className="aura-form glyph-card" style={{ marginBottom: "1rem" }}>
      <h3 className="aura-heading">✦ Export Audit Logs ✦</h3>
      <button onClick={exportCSV} className="tab-btn projects">Export CSV</button>
      <button onClick={exportPDF} className="tab-btn affirmations">Export PDF</button>
    </div>
  );
}
