import React, { useState } from "react";
import { logAuditTrail } from "./LogAuditTrail";

export default function ErrorCards({ errors, user }) {
  const [expandedId, setExpandedId] = useState(null);

  const handleExpand = (error) => {
    const newId = expandedId === error.id ? null : error.id;
    setExpandedId(newId);

    // Log card interaction into audit_trail
    logAuditTrail(
      user,
      errors,
      "ERRORCARD_INTERACTION",
      {
        errorId: error.id,
        message: error.message,
        expanded: newId !== null
      }
    );
  };

  if (errors.length === 0) return <p>No errors logged yet.</p>;

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Error Logs</h2>
      {errors.map((error) => (
        <div
          key={error.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginBottom: "1rem",
            padding: "1rem",
            textAlign: "left"
          }}
        >
          <p><strong>{error.severity}</strong> — {error.message}</p>
          <button
            onClick={() => handleExpand(error)}
            style={{
              marginTop: "0.5rem",
              padding: "0.25rem 0.75rem",
              backgroundColor: "#4A90E2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            {expandedId === error.id ? "Collapse" : "Expand"}
          </button>

          {expandedId === error.id && (
            <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#333" }}>
              <p><strong>Component:</strong> {error.component_stack}</p>
              <p><strong>Created At:</strong> {new Date(error.created_at).toLocaleString()}</p>
              <p><strong>Details:</strong> {error.details || "No additional details"}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
