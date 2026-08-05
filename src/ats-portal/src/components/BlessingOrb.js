// BlessingOrb.js
// Animated golden orb blessing counter

import React from "react";
import "../theme.css";

export default function BlessingOrb({ count }) {
  return (
    <div className="orb-container">
      <div className="orb">
        <span className="orb-count">{count}</span>
      </div>
    </div>
  );
}
