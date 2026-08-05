"use client";

import { useState } from "react";

export default function CertificateIssuancePanel({ onGenerate }: { onGenerate: (payload: any) => void }) {
  const [name, setName] = useState("");
  const [ministry, setMinistry] = useState("");
  const [sector, setSector] = useState("");
  const [role, setRole] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");

  function submit() {
    onGenerate({
      name,
      ministry,
      sector,
      role,
      policy_number: policyNumber,
    });
  }

  return (
    <div className="certificate-panel">
      <h3 className="aura-heading">Certificate Issuance</h3>

      <div className="form-grid">
        <input
          className="aura-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="aura-input"
          placeholder="Ministry"
          value={ministry}
          onChange={(e) => setMinistry(e.target.value)}
        />

        <input
          className="aura-input"
          placeholder="Sector"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        />

        <input
          className="aura-input"
          placeholder="Role / Position"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          className="aura-input"
          placeholder="ATS Policy Number (ATS-XX-XXXXXXAXX-T3-0047)"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
        />
      </div>

      <button className="aura-button" onClick={submit}>
        Generate Certificate
      </button>
    </div>
  );
}
