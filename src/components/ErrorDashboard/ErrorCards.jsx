import React from "react";

export default function ErrorCards({ errors }) {
  if (errors.length === 0) return <p>No errors logged yet.</p>;
  return (
    <div className="aura-grid">
      {errors.map((err) => (
        <div key={err.id} className="glyph-card aura-fade">
          <h2 className="aura-heading" style={{ color: "#ff4d4d" }}>{err.message}</h2>
          <p style={{ fontSize: "12px", opacity: 0.8 }}>{new Date(err.created_at).toLocaleString()}</p>
          {err.severity && <p style={{ fontSize: "12px", fontWeight: "bold", color: "#ff4d4d" }}>Severity: {err.severity}</p>}
          {err.stack && (
            <pre style={{ textAlign: "left", fontSize: "12px", background: "#222", color: "#eee",
              padding: "0.5rem", borderRadius: "6px", overflowX: "auto" }}>{err.stack}</pre>
          )}
        </div>
      ))}
    </div>
  );
}
