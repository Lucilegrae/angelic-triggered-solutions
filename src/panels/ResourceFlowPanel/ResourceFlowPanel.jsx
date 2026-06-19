import React from "react";
import "./resourceFlow.styles.css";
import FlowGraph from "./FlowGraph";
import FlowBreakdown from "./FlowBreakdown";
import { useResourceFlow } from "./resourceFlow.hooks";

const ResourceFlowPanel = () => {
  const { flows } = useResourceFlow();

  return (
    <div className="resource-panel">
      <h2>Resource Flow Panel</h2>
      <FlowGraph flows={flows} />
      <FlowBreakdown flows={flows} />
    </div>
  );
};

export default ResourceFlowPanel;
