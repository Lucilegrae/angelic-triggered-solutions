// CommitmentChamber.js
import React, { useState } from "react";
import "../theme.css";

export default function CommitmentChamber({ onEmpower, onBranchSelect }) {
  const [selectedBranch, setSelectedBranch] = useState(null);

  const handleCommit = (branch) => {
    setSelectedBranch(branch);
    if (onBranchSelect) {
      onBranchSelect(branch); // ✦ Notify App.js of branch choice
    }
  };

  return (
    <div className="commitment-chamber">
      <h2 className="chamber-header">✦ Commitment Chamber ✦</h2>
      <p className="chamber-narration">
        Here you sanctify your alignment. Choose your branch and record your first seal.
      </p>

      {/* Branch Selection */}
      <div className="branch-selector">
        <button className="flame" onClick={() => handleCommit("flame")}>🔥 Flame</button>
        <button className="river" onClick={() => handleCommit("river")}>💧 River</button>
        <button className="stone" onClick={() => handleCommit("stone")}>🪨 Stone</button>
        <button className="all" onClick={() => handleCommit("all")}>✦ All</button>
      </div>

      {/* Confirmation */}
      {selectedBranch && (
        <div className={`commitment-confirm ${selectedBranch}`}>
          <h3>You have chosen:</h3>
          <p className="commitment-choice">
            {selectedBranch === "flame" ? "🔥 Flame — Passion" :
             selectedBranch === "river" ? "💧 River — Flow" :
             selectedBranch === "stone" ? "🪨 Stone — Strength" : "✦ All — Unity"}
          </p>
          <p className="commitment-narration">
            Your seal is recorded in the ledger. Blessings flow into the constellation.
          </p>
          <button className="commit-button all" onClick={onEmpower}>
            Proceed to Empowerment Arena ✦
          </button>
        </div>
      )}
    </div>
  );
}
