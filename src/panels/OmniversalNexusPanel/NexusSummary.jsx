import React from "react";

const NexusSummary = ({ state }) => (
  <div>
    <h3>Nexus Summary</h3>
    <p>Panels integrated: {state.integratedPanels}</p>
  </div>
);

export default NexusSummary;
