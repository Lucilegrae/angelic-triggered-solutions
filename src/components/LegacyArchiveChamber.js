// LegacyArchiveChamber.js
import React from "react";
import "../theme.css";

export default function LegacyArchiveChamber({ archive, branch }) {
  return (
    <div className={`legacy-archive-chamber ${branch}`}>
      <h2 className="archive-header">✦ Legacy Archive Chamber ✦</h2>
      <p className="archive-narration">
        Here your seals and blessings are preserved in lineage. The covenant scroll records each branch alignment.
      </p>

      {/* Animated Banner Scroll (Top) */}
      <div className="banner-scroll top">
        <div className="banner-track">
          {archive.map((entry, index) => (
            <span key={index} className={`banner-seal ${entry.branch}`}>
              {entry.glyph}
            </span>
          ))}
        </div>
      </div>

      {/* Crest Legend Panel */}
      <div className="crest-legend">
        <span className="flame" data-poem="Passion ignites eternal flame">🔥 Flame</span>
        <span className="river" data-poem="Flow carries wisdom downstream">💧 River</span>
        <span className="stone" data-poem="Strength endures through ages">🪨 Stone</span>
        <span className="all" data-poem="Unity binds the covenant">✦ All</span>
      </div>

      {/* Archive Ledger */}
      <div className="archive-ledger">
        {archive.length === 0 ? (
          <p className="archive-empty">No seals recorded yet.</p>
        ) : (
          <ul>
            {archive.map((entry, index) => (
              <li key={index} className={`archive-entry ${entry.branch}`}>
                <span className="archive-glyph">{entry.glyph}</span>
                <span className="archive-branch">
                  {entry.branch === "flame" ? "🔥 Flame" :
                   entry.branch === "river" ? "💧 River" :
                   entry.branch === "stone" ? "🪨 Stone" : "✦ All"}
                </span>
                <span className="archive-blessings">Blessings: {entry.blessings}</span>
                <span className="archive-time">{entry.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Animated Banner Scroll (Bottom) */}
      <div className="banner-scroll bottom">
        <div className="banner-track">
          {archive.map((entry, index) => (
            <span key={index} className={`banner-seal ${entry.branch}`}>
              {entry.glyph}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
