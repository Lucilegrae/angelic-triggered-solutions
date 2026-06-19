import React from "react";

const NexusMatrix = ({ state }) => (
  <div>
    <h3>Nexus Matrix</h3>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
);

export default NexusMatrix;
