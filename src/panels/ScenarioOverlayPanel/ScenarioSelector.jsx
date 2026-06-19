import React from "react";

const ScenarioSelector = ({ scenarios, selected, onChange }) => {
  return (
    <select
      value={selected?.id ?? ""}
      onChange={(e) =>
        onChange(scenarios.find((s) => s.id === e.target.value) || null)
      }
    >
      <option value="">Select scenario</option>
      {scenarios.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
};

export default ScenarioSelector;
