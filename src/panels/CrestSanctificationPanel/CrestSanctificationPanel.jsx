import React from "react";
import "./crest.styles.css";
import CrestPreview from "./CrestPreview";
import AuraSelector from "./AuraSelector";
import { useCrestSanctification } from "./crest.hooks";

const CrestSanctificationPanel = () => {
  const { aura, setAura } = useCrestSanctification();

  return (
    <div className="crest-panel">
      <h2>Crest Sanctification Panel</h2>
      <AuraSelector aura={aura} setAura={setAura} />
      <CrestPreview aura={aura} />
    </div>
  );
};

export default CrestSanctificationPanel;
