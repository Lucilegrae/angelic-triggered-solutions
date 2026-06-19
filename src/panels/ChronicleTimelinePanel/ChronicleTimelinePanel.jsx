import React from "react";
import "./chronicle.styles.css";
import TimelineEvents from "./TimelineEvents";
import TimelineFilters from "./TimelineFilters";
import { useChronicle } from "./chronicle.hooks";

const ChronicleTimelinePanel = () => {
  const { events, filters, setFilters } = useChronicle();

  return (
    <div className="chronicle-panel">
      <h2>Chronicle Timeline Panel</h2>
      <TimelineFilters filters={filters} setFilters={setFilters} />
      <TimelineEvents events={events} />
    </div>
  );
};

export default ChronicleTimelinePanel;
