/* ✦ Golden Aura Retry Control Panel ✦ */
import React, { useState } from "react";
import { setRetrySettings } from "../utils/scheduleReport.js";

export default function RetryControlPanel() {
  const [count, setCount] = useState(2);
  const [delay, setDelay] = useState(5000);

  function updateSettings() {
    setRetrySettings(count, delay);
    alert(`✨ Retry settings updated:\nCount = ${count}\nDelay = ${delay}ms`);
  }

  return (
    <div style={{ border: "2px solid gold", padding: "1rem", marginTop: "1rem", color: "gold" }}>
      <h2>⚙️ Retry Settings Control Panel ✦</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Retry Count:</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value, 10))}
          style={{ width: "60px" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "0.5rem" }}>Retry Delay (ms):</label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(parseInt(e.target.value, 10))}
          style={{ width: "80px" }}
        />
      </div>

      <button
        onClick={updateSettings}
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
        ✨ Update Settings
      </button>
    </div>
  );
}
