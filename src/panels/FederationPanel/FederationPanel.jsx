import React from "react";
import "./federation.styles.css";
import { useFederationData } from "./federation.hooks";
import FederationStats from "./FederationStats";
import FederationTable from "./FederationTable";

const FederationPanel = () => {
  const { data, loading, error } = useFederationData();

  if (loading) return <div className="federation-panel">Loading federation...</div>;
  if (error) return <div className="federation-panel error">Error: {error}</div>;

  return (
    <div className="federation-panel">
      <h2>Federation Panel</h2>
      <FederationStats data={data} />
      <FederationTable data={data} />
    </div>
  );
};

export default FederationPanel;
