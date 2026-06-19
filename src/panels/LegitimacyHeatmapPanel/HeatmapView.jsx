import React from "react";

const HeatmapView = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default HeatmapView;
