import React from "react";

const TimelineEvents = ({ events }) => (
  <ul>
    {events.map((e) => (
      <li key={e.id}>
        [{e.timestamp}] {e.title}
      </li>
    ))}
  </ul>
);

export default TimelineEvents;
