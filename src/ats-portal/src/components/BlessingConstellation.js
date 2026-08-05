// BlessingConstellation.js
// Animated constellation of lineage orbs orbiting central golden orb

import React from "react";
import "../theme.css";

export default function BlessingConstellation({ totals }) {
  return (
    <div className="constellation-container">
      <div className="central-orb">
        <span className="orb-count">{totals.all}</span>
      </div>
      <div className="orbit flame-orb">
        <span className="orb-count">{totals.flame}</span>
      </div>
      <div className="orbit river-orb">
        <span className="orb-count">{totals.river}</span>
      </div>
      <div className="orbit stone-orb">
        <span className="orb-count">{totals.stone}</span>
      </div>
    </div>
  );
}
