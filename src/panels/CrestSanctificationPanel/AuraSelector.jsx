import React from "react";

const AuraSelector = ({ aura, setAura }) => {
  const options = ["blue", "green", "gold", "violet"];

  return (
    <select value={aura} onChange={(e) => setAura(e.target.value)}>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default AuraSelector;
