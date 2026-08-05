"use client";

import { useState } from "react";
import CertificateIssuancePanel from "@/components/ats/certificates/CertificateIssuancePanel";
import SealConstellationView from "@/components/ats/certificates/SealConstellationView";

export default function CertificateGeneratePage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function generateCertificate(payload: any) {
    setError(null);
    setResult(null);

    const res = await fetch("/api/certificates/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!json.ok) {
      setError(json.error);
      return;
    }

    // Fetch privilege
    const privilegeRes = await fetch("/api/allocation/privilege", {
      method: "POST",
      body: JSON.stringify({ policy_number: payload.policy_number }),
    });

    const privilegeJson = await privilegeRes.json();

    setResult({
      ...json,
      privilege: privilegeJson.privilege,
    });
  }

  return (
    <div className="ats-container">
      <h1 className="aura-title">🎖 ATS Certificate Generator</h1>

      <CertificateIssuancePanel onGenerate={generateCertificate} />
      <SealConstellationView />

      {error && <p className="error-text">{error}</p>}

      {result && (
        <div className="certificate-preview">
          <h3>Certificate Generated</h3>

          <p><strong>National ID:</strong> {result.decoded.nationalId}</p>
          <p><strong>Tier:</strong> {result.decoded.tier} — {result.decoded.tierMeaning}</p>
          <p><strong>Join Number:</strong> {result.decoded.joinNumber}</p>

          <h4>Allocation Privilege</h4>
          <p><strong>Rank:</strong> {result.privilege.privilegeRank}</p>
          <p><strong>Score:</strong> {result.privilege.privilegeScore}</p>

          <a className="aura-link" href={`/portal/certificates/view/${result.uuid}`}>
            View Certificate
          </a>
        </div>
      )}
    </div>
  );
}
