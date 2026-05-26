// App.js
import React, { useState } from "react";
import WelcomeGate from "./components/WelcomeGate";
import OrientationHall from "./components/OrientationHall";
import CommitmentChamber from "./components/CommitmentChamber";
import EmpowermentArena from "./components/EmpowermentArena";
import LegacyArchiveChamber from "./components/LegacyArchiveChamber";
import "./theme.css";

export default function App() {
  const [stage, setStage] = useState("welcome");
  const [archive, setArchive] = useState([]);
  const [branch, setBranch] = useState("all");

  // ✦ Map stage to transition class
  const stageClassMap = {
    welcome: "stage-fade",
    orientation: "stage-slide",
    commitment: "stage-aura",
    empowerment: "stage-slide",
    archive: "stage-fade"
  };

  // ✦ Handle branch selection
  const handleBranchSelect = (chosenBranch) => {
    setBranch(chosenBranch);
  };

  // ✦ Handle archive entry creation
  const handleArchive = (blessings) => {
    const newEntry = {
      glyph: "✦",
      branch,
      blessings,
      timestamp: new Date().toLocaleString()
    };
    setArchive(prev => [newEntry, ...prev]);
    setStage("archive"); // ✦ Transition to Legacy Archive Chamber
  };

  return (
    <div className={`app-container ${stageClassMap[stage]} ${branch}`}>
      {stage === "welcome" && (
        <WelcomeGate onEnter={() => setStage("orientation")} />
      )}

      {stage === "orientation" && (
        <OrientationHall onCommit={() => setStage("commitment")} />
      )}

      {stage === "commitment" && (
        <CommitmentChamber
          onEmpower={() => setStage("empowerment")}
          onBranchSelect={handleBranchSelect}
        />
      )}

      {stage === "empowerment" && (
        <EmpowermentArena onArchive={handleArchive} />
      )}

      {stage === "archive" && (
        <LegacyArchiveChamber archive={archive} branch={branch} />
      )}
    </div>
  );
}
