"use client";

import StakeholderComplianceTimeline from "./StakeholderComplianceTimeline";
import StakeholderMechanisationTimeline from "./StakeholderMechanisationTimeline";
import BlessingsTimeline from "./BlessingsTimeline";
import GovernanceArcVisualizer from "./GovernanceArcVisualizer";
import StakeholderPdfGenerator from "./StakeholderPdfGenerator";

export default function StakeholderInfinityProfile({ stakeholder }) {
  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">
        ✦ Stakeholder Infinity Profile ✦
      </h2>

      <div className="pdf-dashboard-grid">
        <div className="pdf-card">
          <h3 className="pdf-title">Core Identity</h3>
          <p>Name: {stakeholder.name}</p>
          <p>Email: {stakeholder.email}</p>
          <p>Role: {stakeholder.role}</p>
          <p>Sector: {stakeholder.sector}</p>
          <p>Legitimacy: {stakeholder.legitimacy_score}</p>
          <p>Upliftment: {stakeholder.upliftment_score}</p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Governance Arcs (Self)</h3>
          {/* Reuse arc bars via GovernanceArcVisualizer pattern if desired */}
          <p className="text-sm text-slate-400">
            See full arcs in Governance Arc Visualizer.
          </p>
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Compliance Timeline</h3>
          <StakeholderComplianceTimeline stakeholderId={stakeholder.id} />
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Mechanisation Timeline</h3>
          <StakeholderMechanisationTimeline stakeholderId={stakeholder.id} />
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">Blessings Timeline</h3>
          <BlessingsTimeline stakeholderId={stakeholder.id} />
        </div>

        <div className="pdf-card">
          <h3 className="pdf-title">PDF Intelligence Export</h3>
          <p className="text-sm text-slate-400 mb-2">
            Use Print → Save as PDF to export this profile.
          </p>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded text-slate-950 mb-4"
          >
            Print / Save as PDF
          </button>
          <StakeholderPdfGenerator stakeholder={stakeholder} />
        </div>
      </div>
    </div>
  );
}
