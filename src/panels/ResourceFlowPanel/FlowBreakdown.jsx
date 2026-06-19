import React from "react";

const FlowBreakdown = ({ flows }) => {
  return (
    <ul>
      {flows.map((f) => (
        <li key={f.id}>
          {f.source} → {f.target}: {f.amount}
        </li>
      ))}
    </ul>
  );
};

export default FlowBreakdown;
