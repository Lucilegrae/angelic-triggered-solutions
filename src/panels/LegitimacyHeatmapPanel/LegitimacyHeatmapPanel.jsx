import React from "react";
import "./legitimacy.styles.css";
import HeatmapView from "./HeatmapView";
import HeatmapLegend from "./HeatmapLegend";
import { useLegitimacyHeatmap } from "./legitimacy.hooks";

const LegitimacyHeatmapPanel = () => {
  const { data } = useLegitimacyHeatmap();

  return (
    <div className="legitimacy-panel">
      <h2>Legitimacy Heatmap Panel</h2>
      <HeatmapLegend />
      <HeatmapView data={data} />
    </div>
  );
};

export default LegitimacyHeatmapPanel;
