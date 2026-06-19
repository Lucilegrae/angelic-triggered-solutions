import React from "react";

const FlowGraph = ({ flows }) => {
  return (
    <div>
      <h3>Flow Graph</h3>
      <pre>{JSON.stringify(flows, null, 2)}</pre>
    </div>
  );
};

export default FlowGraph;
