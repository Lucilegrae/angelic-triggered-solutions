"use client";

import { useEffect, useRef } from "react";
import StakeholderComplianceTimeline from "./StakeholderComplianceTimeline";
import StakeholderMechanisationTimeline from "./StakeholderMechanisationTimeline";

export default function StakeholderPdfGenerator({ stakeholder }) {
  const printRef = useRef(null);

  useEffect(() => {
    // Optional: auto-open print when component mounts
    // setTimeout(() => window.print(), 500);
  }, []);

  return (
    <div
      ref={printRef}
      className="bg-white text-black p-8"
      style={{ width: "800px", margin: "0 auto" }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
        Stakeholder Intelligence Report
      </h1>
      <p style={{ marginBottom: "16px" }}>
        Generated for: <strong>{stakeholder.name}</strong>
      </p>

      <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>Core Details</h2>
      <p>Name: {stakeholder.name}</p>
      <p>Email: {stakeholder.email}</p>
      <p>Role: {stakeholder.role}</p>
      <p>Sector: {stakeholder.sector}</p>
      <p>Legitimacy Score: {stakeholder.legitimacy_score}</p>
      <p>Upliftment Score: {stakeholder.upliftment_score}</p>

      <hr style={{ margin: "16px 0" }} />

      <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>
        Compliance Timeline
      </h2>
      <div style={{ marginBottom: "16px" }}>
        <StakeholderComplianceTimeline stakeholderId={stakeholder.id} />
      </div>

      <h2 style={{ fontSize: "18px", marginBottom: "4px" }}>
        Mechanisation Timeline
      </h2>
      <div>
        <StakeholderMechanisationTimeline stakeholderId={stakeholder.id} />
      </div>
    </div>
  );
}
