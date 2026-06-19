import React from "react";
import { triggerExport } from "./operator.service";

const ExportControls = () => {
  const handleExport = async (format) => {
    await triggerExport(format);
    alert(`Exported in ${format}`);
  };

  return (
    <div>
      <h3>Export Controls</h3>
      <button onClick={() => handleExport("json")}>Export JSON</button>
      <button onClick={() => handleExport("csv")}>Export CSV</button>
    </div>
  );
};

export default ExportControls;
