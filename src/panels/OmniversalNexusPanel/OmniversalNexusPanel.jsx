import React from "react";
import "./nexus.styles.css";
import NexusMatrix from "./NexusMatrix";
import NexusSummary from "./NexusSummary";
import { useNexus } from "./nexus.hooks";

const OmniversalNexusPanel = () => {
  const { state } = useNexus();

  return (
    <div className="nexus-panel">
      <h2>Omniversal Nexus Panel</h2>
      <NexusSummary state={state} />
      <NexusMatrix state={state} />
    </div>
  );
};

export default OmniversalNexusPanel;
