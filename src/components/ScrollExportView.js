// ScrollExportView.js
// Unified ceremonial manuscript view with constellation, wall, timeline, and Legacy Archive Chamber integration

import React, { useState } from "react";
import BlessingConstellation from "./BlessingConstellation";
import CommunityCovenantWall from "./CommunityCovenantWall";
import SharedReflectionStream from "./SharedReflectionStream";
import GoldenTimeline from "./GoldenTimeline";
import "../theme.css";

export default function ScrollExportView({ scrolls, reflections }) {
  const [archive, setArchive] = useState([]);

  const blessingCount = scrolls.length;
  const branches = {
    flame: scrolls.filter(s => s.branch === "flame"),
    river: scrolls.filter(s => s.branch === "river"),
    stone: scrolls.filter(s => s.branch === "stone"),
    all: scrolls.filter(s => s.branch === "all")
  };

  function exportScroll(format = "text") {
    const seals = ["✹", "⌘", "❂", "✪", "✧"];
    const seal = seals[Math.floor(Math.random() * seals.length)];
    const manuscript = {
      header: "✦ Covenant Manuscript ✦",
      blessingCount,
      branches,
      reflections,
      footer: `✦ End of Scroll ✦ ${seal}`,
      timestamp: new Date().toLocaleString()
    };

    let content, filename;
    if (format === "json") {
      content = JSON.stringify(manuscript, null, 2);
      filename = "covenant_manuscript.json";
    } else {
      content = `${manuscript.header}\n\nBlessings: ${manuscript.blessingCount}\n\n${JSON.stringify(manuscript.branches, null, 2)}\n\nReflections:\n${manuscript.reflections.map(r => r.text).join("\n")}\n\n${manuscript.footer}`;
      filename = "covenant_manuscript.txt";
    }

    // Export to file
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // Archive into Legacy Chamber
    archiveManuscript(manuscript);
  }

  function archiveManuscript(manuscript) {
    setArchive(prev => [manuscript, ...prev]);
  }

  return (
    <div className="scroll-container">
      <h1 className="scroll-header">✦ Covenant Manuscript ✦</h1>

      <BlessingConstellation totals={{
        all: blessingCount,
        flame: branches.flame.length,
        river: branches.river.length,
        stone: branches.stone.length
      }} />

      <CommunityCovenantWall />

      <SharedReflectionStream />

      <GoldenTimeline reflections={reflections} />

      <div style={{ textAlign: "center", marginTop: "1rem" }}>
        <button onClick={() => exportScroll("json")}>✦ Export JSON Scroll ✦</button>
        <button onClick={() => exportScroll("text")}>✦ Export Text Scroll ✦</button>
      </div>

      <h2 className="scroll-footer">✦ End of Scroll ✦</h2>

      {/* Legacy Archive Chamber integration */}
      <div style={{ marginTop: "2rem", padding: "1rem", border: "2px solid gold", borderRadius: "8px", background: "#111" }}>
        <h2 style={{ textAlign: "center", color: "#FFD700" }}>✦ Legacy Archive Chamber ✦</h2>
        {archive.length === 0 ? (
          <p>No manuscripts archived yet...</p>
        ) : (
          archive.map((m, index) => (
            <div key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid gold", paddingBottom: "0.5rem" }}>
              <strong>{m.timestamp}</strong>
              <pre style={{ background: "#222", padding: "10px", border: "1px solid gold", borderRadius: "6px", color: "#FFD700", whiteSpace: "pre-wrap" }}>
                {m.header}\nBlessings: {m.blessingCount}\n{JSON.stringify(m.branches, null, 2)}\nReflections:\n{m.reflections.map(r => r.text).join("\n")}\n{m.footer}
              </pre>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
