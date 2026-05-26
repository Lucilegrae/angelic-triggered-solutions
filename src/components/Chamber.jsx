import React from "react";
import AuditTrailPanel from "./AuditTrailPanel";
import useAuditTrails from "../hooks/useAuditTrails";
import "../theme.css";

function Chamber({ stakeholderId, role }) {
  const { trails, loading } = useAuditTrails(stakeholderId);

  return (
    <div className="star-chamber">
      <h3 className="constellation-glyph">{role} Chamber</h3>
      <AuditTrailPanel stakeholderId={stakeholderId} role={role} />
      {loading ? (
        <p className="endurance-flow">Loading audit trails...</p>
      ) : (
        <ul className="audit-trail-list navigation-flow">
          {trails.map(trail => (
            <li key={trail.id} className="audit-trail-item expansion-flow">
              <strong>{trail.action.toUpperCase()}</strong> — {trail.commentary}{" "}
              <em>({trail.signature})</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Chamber;
