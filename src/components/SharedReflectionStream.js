// SharedReflectionStream.js
// Golden timeline of reflections across all branches with crest glyphs, aura animations, and export options

import React, { useState } from "react";
import "../theme.css";

export default function SharedReflectionStream() {
  const [reflections, setReflections] = useState([]);

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target.result;
      const branch = detectBranch(content);
      const reflectionText = extractReflection(content);

      if (reflectionText) {
        setReflections(prev => [
          {
            text: reflectionText,
            branch,
            timestamp: new Date().toLocaleString(),
            source: file.name
          },
          ...prev
        ]);
      }
    };
    reader.readAsText(file);
  }

  function detectBranch(content) {
    const lower = content.toLowerCase();
    if (lower.includes("flame")) return "flame";
    if (lower.includes("river")) return "river";
    if (lower.includes("stone")) return "stone";
    return "all";
  }

  function extractReflection(content) {
    const match = content.match(/reflection[:\-]\s*(.*)/i);
    return match ? match[1] : null;
  }

  function branchStyle(branch) {
    switch (branch) {
      case "flame":
        return { glyph: "🔥", className: "reflection-node flame" };
      case "river":
        return { glyph: "💧", className: "reflection-node river" };
      case "stone":
        return { glyph: "🪨", className: "reflection-node stone" };
      default:
        return { glyph: "✦", className: "reflection-node all" };
    }
  }

  // Export reflections as anthology scroll
  function exportReflections(format = "text") {
    const seals = ["✹", "⌘", "❂", "✪", "✧"];
    const seal = seals[Math.floor(Math.random() * seals.length)];

    let content;
    let filename;

    if (format === "json") {
      content = JSON.stringify(
        {
          header: "✦ Shared Reflection Anthology ✦",
          reflections,
          footer: `✦ End of Reflection Stream ✦ ${seal}`
        },
        null,
        2
      );
      filename = "shared_reflection_stream.json";
    } else {
      const entries = reflections
        .map(
          r =>
            `${r.timestamp} — ${r.source} ${r.branch.toUpperCase()}\n${r.text}`
        )
        .join("\n\n");

      content = `✦ Shared Reflection Anthology ✦\n\n${entries}\n\n✦ End of Reflection Stream ✦ ${seal}`;
      filename = "shared_reflection_stream.txt";
    }

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "rgba(0,0,0,0.85)",
        color: "gold",
        border: "4px solid gold",
        borderRadius: "12px",
        boxShadow: "0 0 25px rgba(255, 215, 0, 0.7)",
        marginTop: "2rem"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        ✦ Shared Reflection Stream ✦
      </h1>

      <input
        type="file"
        accept=".txt,.json"
        onChange={handleUpload}
        style={{ marginBottom: "1rem", color: "gold" }}
      />

      {/* Export buttons */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <button onClick={() => exportReflections("json")}>
          ✦ Export JSON Anthology ✦
        </button>
        <button onClick={() => exportReflections("text")}>
          ✦ Export Text Anthology ✦
        </button>
      </div>

      {reflections.length === 0 ? (
        <p>No reflections yet...</p>
      ) : (
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            background: "#111",
            padding: "1rem",
            border: "2px solid gold",
            borderRadius: "8px"
          }}
        >
          {reflections.map((reflection, index) => {
            const { glyph, className } = branchStyle(reflection.branch);
            return (
              <div key={index} className={className} style={{ marginBottom: "1rem" }}>
                <strong>{reflection.timestamp}</strong> — {glyph} {reflection.source}
                <div style={{ marginTop: "0.5rem", color: "gold" }}>
                  {reflection.text}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
