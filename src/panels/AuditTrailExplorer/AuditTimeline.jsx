import React from "react";

const AuditTimeline = ({ events }) => (
  <ul>
    {events.map((e) => (
      <li key={e.id}>
        [{e.timestamp}] {e.actor} → {e.action}
      </li>
    ))}
  </ul>
);

export default AuditTimeline;
