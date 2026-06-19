import React from "react";

const ExportOptions = ({ onExport }) => {
  return (
    <div>
      <button onClick={() => onExport("json")}>Export JSON</button>
      <button onClick={() => onExport("csv")}>Export CSV</button>
      <button onClick={() => onExport("pdf")}>Export PDF</button>
    </div>
  );
};

export default ExportOptions;
