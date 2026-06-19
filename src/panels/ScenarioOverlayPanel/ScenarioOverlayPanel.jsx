import React from "react";
import "./scenario.styles.css";
import { useScenarios } from "./scenario.hooks";
import ScenarioSelector from "./ScenarioSelector";
import ScenarioComparison from "./ScenarioComparison";

const ScenarioOverlayPanel = () => {
  const { scenarios, selected, setSelected } = useScenarios();

  return (
    <div className="scenario-panel">
      <h2>Scenario Overlay Panel</h2>
      <ScenarioSelector
        scenarios={scenarios}
        selected={selected}
        onChange={setSelected}
      />
      <ScenarioComparison selected={selected} />
    </div>
  );
};

export default ScenarioOverlayPanel;
