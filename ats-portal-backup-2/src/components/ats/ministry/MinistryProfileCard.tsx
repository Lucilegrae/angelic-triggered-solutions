"use client";

import { useMinistryProfile } from "@/hooks/api/ministry/useMinistryProfile";
import type { GetMinistryProfileArgs } from "@/types/supabase/rpc";

export default function MinistryProfileCard({ ministry_id }: { ministry_id: string }) {
  const { call, loading, ministry, error } = useMinistryProfile();

  async function load() {
    const args: GetMinistryProfileArgs = { ministry_id };
    call(args);
  }

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🏛 Ministry Profile</h3>

      <button onClick={load} className="ats-button" disabled={loading}>
        {loading ? "Loading..." : "Load Ministry"}
      </button>

      {error && <p className="error-text">{error}</p>}
      {ministry && (
        <div className="ats-card">
          <p><strong>Name:</strong> {ministry.name}</p>
          <p><strong>Code:</strong> {ministry.code}</p>
          <p><strong>Status:</strong> {ministry.status}</p>
        </div>
      )}
    </div>
  );
}
