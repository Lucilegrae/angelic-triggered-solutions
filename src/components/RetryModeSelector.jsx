/* ✦ Golden Aura Retry Mode Selector ✦ */
import React, { useState } from "react";
import { setRetrySettings } from "../utils/scheduleReport.js";

export default function RetryModeSelector() {
  const [mode, setMode] = useState("default");

  const modes = {
    default: { count: 2, delay: 5000 },
    daily: { count: 3, delay: 3000 },
    weekly: { count: 5, delay: 10000 },
    monthly: { count: 7, delay: 15000 },
  };

  function applyMode(selected) {
    const { count, delay } = modes[selected];
    setRetrySettings(count, delay);
    alert(`✨ Retry mode set to ${selected}:\nCount = ${count}, Delay = ${delay}ms`);
  }

  return (
    <div style={{ border: "2px solid gold", padding: "1rem", marginTop: "1rem", color: "gold" }}>
      <h2>⚙️ Retry Mode Selector ✦</h2>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "1rem" }}
      >
        <option value="default">Default (2 retries, 5s delay)</option>
        <option value="daily">Daily (3 retries, 3s delay)</option>
        <option value="weekly">Weekly (5 retries, 10s delay)</option>
        <option value="monthly">Monthly (7 retries, 15s delay)</option>
      </select>
      <button
        onClick={() => applyMode(mode)}
        style={{
          background: "rgba(20,20,20,0.9)",
          border: "2px solid gold",
          borderRadius: "6px",
          padding: "0.6rem 1rem",
          color: "gold",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ✨ Apply Mode
      </button>
    </div>
  );
}
