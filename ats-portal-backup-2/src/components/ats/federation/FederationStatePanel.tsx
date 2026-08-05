"use client";

import { useFederationState } from "@/hooks/api/federation/useFederationState";

export default function FederationStatePanel() {
  const { loading, state, error } = useFederationState();

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🌐 Federation State</h3>

      {loading && <p>Loading federation state...</p>}
      {error && <p className="error-text">{error}</p>}
      {state && (
        <pre className="ats-json">{JSON.stringify(state, null, 2)}</pre>
      )}
    </div>
  );
}
