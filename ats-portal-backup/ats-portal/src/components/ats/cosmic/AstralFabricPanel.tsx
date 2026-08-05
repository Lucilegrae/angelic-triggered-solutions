"use client";

import { useAstralFabric } from "@/hooks/api/cosmic/useAstralFabric";

export default function AstralFabricPanel() {
  const { loading, fabric, error } = useAstralFabric();

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">✨ Astral Fabric</h3>

      {loading && <p>Loading astral fabric...</p>}
      {error && <p className="error-text">{error}</p>}
      {fabric && (
        <pre className="ats-json">{JSON.stringify(fabric, null, 2)}</pre>
      )}
    </div>
  );
}
