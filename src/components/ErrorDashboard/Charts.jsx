import React from "react";

export default function Charts({ errors, user, onInteraction }) {
  const handleClick = (chartType) => {
    if (onInteraction) {
      onInteraction(chartType, "CLICK");
    }
  };

  const handleView = (chartType) => {
    if (onInteraction) {
      onInteraction(chartType, "VIEW");
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2>Charts</h2>
      <div
        onClick={() => handleClick("ErrorTrend")}
        onMouseEnter={() => handleView("ErrorTrend")}
        style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}
      >
        <p>Error Trend Chart (click or hover)</p>
      </div>
      <div
        onClick={() => handleClick("SeverityDistribution")}
        onMouseEnter={() => handleView("SeverityDistribution")}
        style={{ border: "1px solid #ccc", padding: "1rem" }}
      >
        <p>Severity Distribution Chart (click or hover)</p>
      </div>
    </div>
  );
}
