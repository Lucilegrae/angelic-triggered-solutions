// CommunityCovenantWall.js
// Collective lineage sanctuary with branch columns, crest banners, blessing tally, and aura animations

import React, { useState } from "react";
import "../theme.css"; // aura animations defined here
import BlessingConstellation from "./BlessingConstellation";

export default function CommunityCovenantWall() {
  const [scrolls, setScrolls] = useState([]);

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target.result;
      setScrolls(prev => [
        {
          name: file.name,
          content,
          timestamp: new Date().toLocaleString(),
          branch: detectBranch(content)
        },
        ...prev
      ]);
    };
    reader.readAsText(file);
  }

  // Simple branch detection based on content keywords
  function detectBranch(content) {
    const lower = content.toLowerCase();
    if (lower.includes("flame")) return "flame";
    if (lower.includes("river")) return "river";
    if (lower.includes("stone")) return "stone";
    return "all";
  }

  // Aggregate blessing tally
  const blessingCount = scrolls.length;

  // Group scrolls by branch
  const branches = {
    flame: scrolls.filter(s => s.branch === "flame"),
    river: scrolls.filter(s => s.branch === "river"),
    stone: scrolls.filter(s => s.branch === "stone"),
    all: scrolls.filter(s => s.branch === "all")
  };

  function crestBanner(branch) {
    switch (branch) {
      case "flame":
        return <h2 className="crest-banner flame">🔥 Flame Lineage Crest 🔥</h2>;
      case "river":
        return <h2 className="crest-banner river">💧 River Lineage Crest 💧</h2>;
      case "stone":
        return <h2 className="crest-banner stone">🪨 Stone Lineage Crest 🪨</h2>;
      default:
        return <h2 className="crest-banner all">✦ All Lineages ✦</h2>;
    }
  }

  return (
    <div
      style={{
        padding: "2rem",
        background: "rgba(0,0,0,0.85)",
        color: "gold",
        border: "4px solid gold",
        borderRadius: "12px",
        boxShadow: "0 0 25px rgba(255, 215, 0, 0.7)"
      }}
    >

      <BlessingConstellation totals={{
        all: blessingCount,
        flame: branches.flame.length,
        river: branches.river.length,
        stone: branches.stone.length
      }} />

      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        ✦ Community Covenant Wall ✦
      </h1>

      {/* Community blessing tally */}
      <div
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          marginBottom: "1rem",
          fontWeight: "bold",
          color: "#FFD700"
        }}
      >
        Total Lineage Blessings ✦ {blessingCount}
      </div>

      {/* Upload scrolls */}
      <input
        type="file"
        accept=".txt,.json"
        onChange={handleUpload}
        style={{ marginBottom: "1rem", color: "gold" }}
      />

      {/* Branch columns */}
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {["flame", "river", "stone"].map(branch => (
          <div
            key={branch}
            style={{
              flex: 1,
              margin: "0 0.5rem",
              background: "#111",
              padding: "1rem",
              border: "2px solid gold",
              borderRadius: "8px",
              maxHeight: "400px",
              overflowY: "auto"
            }}
          >
            {crestBanner(branch)}
            {branches[branch].length === 0 ? (
              <p>No {branch} scrolls yet...</p>
            ) : (
              branches[branch].map((scroll, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                  <strong>{scroll.timestamp}</strong> — {scroll.name}
                  <pre
                    style={{
                      background: "#222",
                      padding: "10px",
                      border: "1px solid gold",
                      borderRadius: "6px",
                      color: "#FFD700",
                      whiteSpace: "pre-wrap"
                    }}
                  >
                    {scroll.content}
                  </pre>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
