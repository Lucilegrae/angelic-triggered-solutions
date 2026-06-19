import React from "react";
import "./cosmicUnity.styles.css";
import { useCosmicUnity } from "./cosmicUnity.hooks";
import UnityGraph from "./UnityGraph";
import UnitySummary from "./UnitySummary";

const CosmicUnityPanel = () => {
  const { data, loading, error } = useCosmicUnity();

  if (loading) return <div className="cosmic-panel">Loading cosmic unity...</div>;
  if (error) return <div className="cosmic-panel error">Error: {error}</div>;

  return (
    <div className="cosmic-panel">
      <h2>Cosmic Unity Panel</h2>
      <UnitySummary data={data} />
      <UnityGraph data={data} />
    </div>
  );
};

export default CosmicUnityPanel;
