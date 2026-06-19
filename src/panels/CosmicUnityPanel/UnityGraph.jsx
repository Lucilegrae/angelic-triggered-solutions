import React from "react";

const UnityGraph = ({ data }) => {
  return (
    <div>
      <h3>Unity Graph</h3>
      <pre>{JSON.stringify(data?.series ?? [], null, 2)}</pre>
    </div>
  );
};

export default UnityGraph;
