// PortalChambers.js
// React component for Angelic Triggered Solutions portal

import React, { useState } from 'react';
import {
  createStakeholder,
  updateProgress,
  addBlessing,
  submitReflection
} from './supabaseClient.js';

export default function PortalChambers() {
  const [output, setOutput] = useState("");

  async function handleCreate() {
    const result = await createStakeholder("Prince Masvikepi", "pnovontony@yahoo.com", "Visionary");
    setOutput(JSON.stringify(result, null, 2));
  }

  async function handleUpdate() {
    const stakeholderId = prompt("Enter Stakeholder UUID:");
    const stage = parseInt(prompt("Enter new progress stage:"), 10);
    const result = await updateProgress(stakeholderId, stage);
    setOutput(JSON.stringify(result, null, 2));
  }

  async function handleBlessing() {
    const stakeholderId = prompt("Enter Stakeholder UUID:");
    const branch = prompt("Enter branch:");
    const phrase = prompt("Enter blessing phrase:");
    const progressPercent = parseInt(prompt("Enter progress percent:"), 10);
    const result = await addBlessing(stakeholderId, branch, phrase, progressPercent);
    setOutput(JSON.stringify(result, null, 2));
  }

  async function handleReflection() {
    const stakeholderId = prompt("Enter Stakeholder UUID:");
    const reflectionText = prompt("Enter reflection text:");
    const result = await submitReflection(stakeholderId, reflectionText);
    setOutput(JSON.stringify(result, null, 2));
  }

  return (
    <div style={{ padding: "20px", fontFamily: "serif" }}>
      <h2>Angelic Triggered Solutions Portal Chambers</h2>
      <button onClick={handleCreate}>Orientation Hall: Create Stakeholder</button>
      <button onClick={handleUpdate}>Commitment Chamber: Update Progress</button>
      <button onClick={handleBlessing}>Empowerment Arena: Add Blessing</button>
      <button onClick={handleReflection}>Legacy Archive: Submit Reflection</button>

      <pre style={{ marginTop: "20px", background: "#f4f4f4", padding: "10px" }}>
        {output}
      </pre>
    </div>
  );
}
