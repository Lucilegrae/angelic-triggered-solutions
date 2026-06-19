import React from "react";

const ScenarioComparison = ({ selected }) => {
  if (!selected) return <p>No scenario selected.</p>;
  return (
    <div>
      <h3>{selected.name}</h3>
      <pre>{JSON.stringify(selected, null, 2)}</pre>
    </div>
  );
};

export default ScenarioComparison;
