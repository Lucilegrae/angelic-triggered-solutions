import React from "react";

export default function DebugOverlay({ current }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        background: "rgba(0,0,0,0.7)",
        color: "lime",
        padding: "8px",
        fontSize: "12px",
        zIndex: 9999,
      }}
    >
      Rendering: {current}
    </div>
  );
}
