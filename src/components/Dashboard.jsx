import React from "react";
import KPICard from "./KPICard";
import ProposalCard from "./ProposalCard";
import "./../theme.css";   // 🌌 Import aura theme

function Dashboard() {
  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-aura text-3xl font-bold mb-8 text-center">
        Angelic Triggered Solutions — Legitimacy Dashboard
      </h1>

      {/* KPI Section */}
      <section className="mb-12">
        <h2 className="text-ritual text-2xl font-semibold mb-6">
          Key Performance Indicators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Housing Units Built"
            value="120"
            signature="MoF Auditor"
            comment="Review Completed"
          />
          <KPICard
            title="Jobs Created"
            value="50"
            signature="Investor Analyst"
            comment="Department Feedback"
          />
          <KPICard
            title="Repayment Rate"
            value="92%"
            signature="Government Oversight"
            comment="All Approved"
          />
        </div>
      </section>

      {/* Proposal Section */}
      <section>
        <h2 className="text-ritual text-2xl font-semibold mb-6">
          Community Proposals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProposalCard
            title="Water Reticulation Project"
            status="Submitted"
            stakeholder="Community Representative"
            narration="Community Representative submitted proposal 'Water Reticulation Project'"
            comment="Needs review by Ministry"
            signature="Community Lead"
          />
          <ProposalCard
            title="Housing Expansion Phase 1"
            status="Approved"
            stakeholder="Ministry of Finance Auditor"
            narration="Ministry of Finance Auditor updated proposal 'Housing Expansion Phase 1' to status Approved"
            comment="Review Completed"
            signature="MoF Auditor"
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
