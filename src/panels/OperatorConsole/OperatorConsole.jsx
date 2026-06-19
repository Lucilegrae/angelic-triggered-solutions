import React from "react";
import "./operator.styles.css";
import RitualTriggers from "./RitualTriggers";
import ExportControls from "./ExportControls";

const OperatorConsole = () => {
  return (
    <div className="operator-panel">
      <h2>Operator Console</h2>
      <RitualTriggers />
      <ExportControls />
    </div>
  );
};

export default OperatorConsole;
