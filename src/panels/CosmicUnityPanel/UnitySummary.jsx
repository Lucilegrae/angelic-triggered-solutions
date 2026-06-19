import React from "react";

const UnitySummary = ({ data }) => {
  return (
    <div>
      <h3>Unity Summary</h3>
      <p>Harmony index: {data?.harmony_index ?? "N/A"}</p>
    </div>
  );
};

export default UnitySummary;
