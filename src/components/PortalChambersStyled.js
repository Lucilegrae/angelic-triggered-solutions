// PortalChambersStyled.js
// Motif-styled covenant chambers with golden aura, glyph aura, poetic separators,
// lineage blessing counter, scroll-like audit log, branch motifs, crest glyphs, and rotating seal export

import React, { useState } from "react";
import {
  createStakeholder,
  updateProgress,
  addBlessing,
  submitReflection
} from ".../supabaseClient.js";
import GlyphBackground from "./GlyphBackground";

export default function PortalChambersStyled() {
  const [output, setOutput] = useState("");
  const [blessingCount, setBlessingCount] = useState(0);
  const [auditLog, setAuditLog] = useState([]);

  function addAuditEntry(action, details, branch = null) {
    const entry = {
      timestamp: new Date().toLocaleString(),
      action,
      details,
      branch
    };
    setAuditLog(prev => [entry, ...prev]);
  }

  async function handleCreate() {
    const result = await createStakeholder("Prince Masvikepi", "pnovontony@yahoo.com", "Visionary");
    setOutput(JSON.stringify(result, null, 2));
    setBlessingCount(prev => prev + 1);
    addAuditEntry("Orientation Hall", "Created stakeholder Prince Masvikepi");
  }

  async function handleUpdate() {
    const stakeholderId = prompt("Enter Stakeholder UUID:");
    const stage = parseInt(prompt("Enter new progress stage:"), 10);
    const result = await updateProgress(stakeholderId, stage);
    setOutput(JSON.stringify(result, null, 2));
    setBlessingCount(prev => prev + 1);
    addAuditEntry("Commitment Chamber", `Updated progress stage to ${stage}`);
  }

  async function handleBlessing() {
    const stakeholderId = prompt("Enter Stakeholder UUID:");
    const branch = prompt("Enter branch (Flame, River, Stone):");
    const phrase = prompt("Enter blessing phrase:");
    const progressPercent = parseInt(prompt("Enter progress percent:"), 10);
    const result = await addBlessing(stakeholderId, branch, phrase, progressPercent);
    setOutput(JSON.stringify(result, null, 2));
    setBlessingCount(prev => prev + 1);
    addAuditEntry("Empowerment Arena", `Blessing added: "${phrase}"`, branch);
  }

  async function handleReflection() {
    const stakeholderId = prompt("Enter Stakeholder UUID:");
    const reflectionText = prompt("Enter reflection text:");
    const result = await submitReflection(stakeholderId, reflectionText);
    setOutput(JSON.stringify(result, null, 2));
    setBlessingCount(prev => prev + 1);
    addAuditEntry("Legacy Archive", `Reflection submitted: "${reflectionText}"`);
  }

  // Branch motif colors + glyphs
  function branchStyle(branch) {
    switch (branch?.toLowerCase()) {
      case "flame":
        return { color: "#FF4500", glyph: "🔥" };
      case "river":
        return { color: "#1E90FF", glyph: "💧" };
      case "stone":
        return { color: "#A9A9A9", glyph: "🪨" };
      default:
        return { color: "#FFD700", glyph: "✦" };
    }
  }

  // Export lineage scroll with ceremonial header/footer + rotating seal
  function exportAuditLog(format = "json") {
    const seals = ["✹", "⌘", "❂", "✪", "✧"];
    const seal = seals[Math.floor(Math.random() * seals.length)];

    let content;
    let filename;

    if (format === "json") {
      content = JSON.stringify(
        {
          header: "✦ Lineage Anthology ✦",
          entries: auditLog,
          footer: `✦ End of Scroll ✦ ${seal}`
        },
        null,
        2
      );
      filename = "lineage_audit_log.json";
    } else {
      const entries = auditLog
        .map(
          entry =>
            `${entry.timestamp} — ${entry.action}: ${entry.details}${
              entry.branch ? ` [Branch: ${entry.branch}]` : ""
            }`
        )
        .join("\n");

      content = `✦ Lineage Anthology ✦\n\n${entries}\n\n✦ End of Scroll ✦ ${seal}`;
      filename = "lineage_audit_log.txt";
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  return (
    <div style={{ position: "relative" }}>
      <GlyphBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "2rem",
          background: "rgba(0,0,0,0.7)",
          color: "gold",
          border: "4px solid gold",
          borderRadius: "12px",
          boxShadow: "0 0 25px rgba(255, 215, 0, 0.7)"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
          ✦ Covenant Portal Chambers ✦
        </h1>

        {/* Lineage Blessing Counter */}
        <div
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontWeight: "bold",
            color: "#FFD700"
          }}
        >
          Lineage Blessings Count ✦ {blessingCount}
        </div>

        {/* Chamber buttons */}
        <button onClick={handleCreate}>✦ Orientation Hall: Create Stakeholder ✦</button>
        <button onClick={handleUpdate}>✦ Commitment Chamber: Update Progress ✦</button>
        <button onClick={handleBlessing}>✦ Empowerment Arena: Add Blessing ✦</button>
        <button onClick={handleReflection}>✦ Legacy Archive: Submit Reflection ✦</button>

        {/* Scroll-like Audit Log */}
        <div
          style={{
            marginTop: "20px",
            background: "#111",
            padding: "15px",
            border: "2px solid gold",
            borderRadius: "8px",
            fontFamily: "monospace",
            maxHeight: "200px",
            overflowY: "auto"
          }}
        >
          <h2 style={{ textAlign: "center", color: "#FFD700" }}>✦ Lineage Audit Log ✦</h2>
          {auditLog.length === 0 ? (
            <p>No entries yet...</p>
          ) : (
            auditLog.map((entry, index) => {
              const { color, glyph } = branchStyle(entry.branch);
              return (
                <div key={index} style={{ marginBottom: "10px", color }}>
                  <strong>{entry.timestamp}</strong> — {glyph} {entry.action}: {entry.details}
                  {entry.branch && <span> [Branch: {entry.branch}]</span>}
                </div>
              );
            })
          )}
        </div>

        {/* Export buttons */}
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button onClick={() => exportAuditLog("json")}>✦ Export JSON Scroll ✦</button>
          <button onClick={() => exportAuditLog("text")}>✦ Export Text Scroll ✦</button>
        </div>

        {/* Output panel */}
        <pre
          style={{
            marginTop: "20px",
            background: "#111",
            padding: "15px",
            border: "2px solid gold",
            borderRadius: "8px",
            color: "#FFD700",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap"
          }}
        >
          {output}
        </pre>
      </div>
    </div>
  );
}
