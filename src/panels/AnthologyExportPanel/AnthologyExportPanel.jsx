import React from "react";
import "./anthology.styles.css";
import ExportOptions from "./ExportOptions";
import ExportHistory from "./ExportHistory";
import { useAnthologyExports } from "./anthology.hooks";

const AnthologyExportPanel = () => {
  const { history, triggerExport } = useAnthologyExports();

  return (
    <div className="anthology-panel">
      <h2>Anthology Export Panel</h2>
      <ExportOptions onExport={triggerExport} />
      <ExportHistory history={history} />
    </div>
  );
};

export default AnthologyExportPanel;
