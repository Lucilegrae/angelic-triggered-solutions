import React from "react";
import { triggerCadence } from "./operator.service";

const RitualTriggers = () => {
  const handleClick = async (type) => {
    await triggerCadence(type);
    alert(`Triggered ${type} cadence`);
  };

  return (
    <div>
      <h3>Ritual Triggers</h3>
      <button onClick={() => handleClick("daily")}>Run Daily</button>
      <button onClick={() => handleClick("weekly")}>Run Weekly</button>
    </div>
  );
};

export default RitualTriggers;
