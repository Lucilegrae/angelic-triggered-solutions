"use client";

import FederationStatePanel from "@/components/ats/federation/FederationStatePanel";

export default function FederationDashboard() {
  return (
    <div className="ats-container">
      <h1 className="aura-title">🌐 Federation Intelligence</h1>

      <FederationStatePanel />
    </div>
  );
}
