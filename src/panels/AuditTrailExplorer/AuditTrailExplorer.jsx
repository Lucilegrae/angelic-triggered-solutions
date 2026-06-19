import React from "react";
import "./audit.styles.css";
import { useAuditTrail } from "./audit.hooks";
import AuditTimeline from "./AuditTimeline";
import AuditFilters from "./AuditFilters";

const AuditTrailExplorer = () => {
  const { events, filters, setFilters } = useAuditTrail();

  return (
    <div className="audit-panel">
      <h2>Audit Trail Explorer</h2>
      <AuditFilters filters={filters} setFilters={setFilters} />
      <AuditTimeline events={events} />
    </div>
  );
};

export default AuditTrailExplorer;
