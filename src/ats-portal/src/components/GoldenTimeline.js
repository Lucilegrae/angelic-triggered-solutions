// GoldenTimeline.js
// Horizontal glowing timeline of reflections

import React from "react";
import "../theme.css";

export default function GoldenTimeline({ reflections }) {
  return (
    <div className="timeline-container">
      <h2 className="timeline-header">✦ Golden Reflection Timeline ✦</h2>
      <div className="timeline">
        {reflections.map((r, index) => (
          <div key={index} className={`timeline-node ${r.branch}`}>
            <span className="glyph">
              {r.branch === "flame" ? "🔥" :
               r.branch === "river" ? "💧" :
               r.branch === "stone" ? "🪨" : "✦"}
            </span>
            <div className="reflection-card">
              <strong>{r.timestamp}</strong> — {r.source}
              <p>{r.text}</p>
            </div>
            {index < reflections.length - 1 && <div className="timeline-line"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
