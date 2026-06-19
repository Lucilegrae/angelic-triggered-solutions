import React from "react";

const FederationStats = ({ data }) => {
  return (
    <div>
      <h3>Federation Stats</h3>
      <p>Total institutions: {data?.institutions?.length ?? 0}</p>
    </div>
  );
};

export default FederationStats;
