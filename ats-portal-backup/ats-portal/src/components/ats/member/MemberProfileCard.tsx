"use client";

import { useMemberProfile } from "@/hooks/api/member/useMemberProfile";
import type { GetMemberProfileArgs } from "@/types/supabase/rpc";

export default function MemberProfileCard({ member_id }: { member_id: string }) {
  const { call, loading, profile, error } = useMemberProfile();

  async function load() {
    const args: GetMemberProfileArgs = { member_id };
    call(args);
  }

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">👤 Member Profile</h3>

      <button onClick={load} className="ats-button" disabled={loading}>
        {loading ? "Loading..." : "Load Member"}
      </button>

      {error && <p className="error-text">{error}</p>}
      {profile && (
        <pre className="ats-json">{JSON.stringify(profile, null, 2)}</pre>
      )}
    </div>
  );
}
