"use client";

import { useState } from "react";

export default function OnboardingPage() {
  const [memberForm, setMemberForm] = useState({
    full_name: "",
    email: "",
    policy_number: "",
    auth_user_id: "",
  });

  const [unitForm, setUnitForm] = useState({
    unit_code: "",
    block_name: "",
    location: "",
    max_families: "",
  });

  const [tierForm, setTierForm] = useState({
    member_id: "",
    tier: "",
    priority: "",
  });

  const [allocationMemberId, setAllocationMemberId] = useState("");
  const [log, setLog] = useState<string>("");

  async function submitMember() {
    const res = await fetch("/api/onboarding/member/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberForm),
    });
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
  }

  async function submitUnit() {
    const payload = {
      ...unitForm,
      max_families: Number(unitForm.max_families),
    };
    const res = await fetch("/api/onboarding/unit/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
  }

  async function submitTier() {
    const res = await fetch("/api/onboarding/member/tier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tierForm),
    });
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
  }

  async function runAllocation() {
    const res = await fetch("/api/allocation/run", {
      method: "POST",
    });
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
  }

  async function checkAllocationStatus() {
    const res = await fetch(`/api/allocation/status/${allocationMemberId}`);
    const json = await res.json();
    setLog(JSON.stringify(json, null, 2));
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 24 }}>
      <h1>ATS Onboarding Console</h1>

      {/* Member creation */}
      <section style={{ border: "1px solid #ccc", padding: 16 }}>
        <h2>Create Member</h2>
        <input
          placeholder="Full name"
          value={memberForm.full_name}
          onChange={e => setMemberForm(f => ({ ...f, full_name: e.target.value }))}
        />
        <input
          placeholder="Email"
          value={memberForm.email}
          onChange={e => setMemberForm(f => ({ ...f, email: e.target.value }))}
        />
        <input
          placeholder="Policy number"
          value={memberForm.policy_number}
          onChange={e => setMemberForm(f => ({ ...f, policy_number: e.target.value }))}
        />
        <input
          placeholder="Auth user ID (UUID)"
          value={memberForm.auth_user_id}
          onChange={e => setMemberForm(f => ({ ...f, auth_user_id: e.target.value }))}
        />
        <button onClick={submitMember}>Create Member</button>
      </section>

      {/* Unit registration */}
      <section style={{ border: "1px solid #ccc", padding: 16 }}>
        <h2>Register Unit</h2>
        <input
          placeholder="Unit code (e.g. A-01)"
          value={unitForm.unit_code}
          onChange={e => setUnitForm(f => ({ ...f, unit_code: e.target.value }))}
        />
        <input
          placeholder="Block name (e.g. A)"
          value={unitForm.block_name}
          onChange={e => setUnitForm(f => ({ ...f, block_name: e.target.value }))}
        />
        <input
          placeholder="Location"
          value={unitForm.location}
          onChange={e => setUnitForm(f => ({ ...f, location: e.target.value }))}
        />
        <input
          placeholder="Max families"
          value={unitForm.max_families}
          onChange={e => setUnitForm(f => ({ ...f, max_families: e.target.value }))}
        />
        <button onClick={submitUnit}>Register Unit</button>
      </section>

      {/* Tier assignment */}
      <section style={{ border: "1px solid #ccc", padding: 16 }}>
        <h2>Assign Tier</h2>
        <input
          placeholder="Member ID (UUID)"
          value={tierForm.member_id}
          onChange={e => setTierForm(f => ({ ...f, member_id: e.target.value }))}
        />
        <input
          placeholder="Tier (e.g. GOLD)"
          value={tierForm.tier}
          onChange={e => setTierForm(f => ({ ...f, tier: e.target.value }))}
        />
        <input
          placeholder="Priority (e.g. HIGH)"
          value={tierForm.priority}
          onChange={e => setTierForm(f => ({ ...f, priority: e.target.value }))}
        />
        <button onClick={submitTier}>Assign Tier</button>
      </section>

      {/* Allocation trigger */}
      <section style={{ border: "1px solid #ccc", padding: 16 }}>
        <h2>Run Allocation Engine</h2>
        <button onClick={runAllocation}>Run Allocation</button>
      </section>

      {/* Allocation status */}
      <section style={{ border: "1px solid #ccc", padding: 16 }}>
        <h2>Check Allocation Status</h2>
        <input
          placeholder="Member ID (UUID)"
          value={allocationMemberId}
          onChange={e => setAllocationMemberId(e.target.value)}
        />
        <button onClick={checkAllocationStatus}>Check Status</button>
      </section>

      {/* Log viewer */}
      <section style={{ border: "1px solid #ccc", padding: 16 }}>
        <h2>Response Log</h2>
        <pre style={{ whiteSpace: "pre-wrap" }}>{log}</pre>
      </section>
    </div>
  );
}
