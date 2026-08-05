"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyCertificate() {
  const params = useSearchParams();
  const token = params.get("token");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("/api/onboarding/verify-qr", {
      method: "POST",
      body: JSON.stringify({ token })
    })
      .then(res => res.json())
      .then(json => setResult(json));
  }, [token]);

  if (!result) return <div className="p-6">Verifying certificate...</div>;

  if (!result.ok) {
    return (
      <div className="p-6 text-red-500 text-xl">
        Invalid or expired certificate.
      </div>
    );
  }

  const { stakeholder, ceremony_timestamp } = result.certificate;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Certificate Verified</h1>

      <div className="bg-slate-900 p-4 rounded">
        <p>Name: {stakeholder.full_name}</p>
        <p>Ministry: {stakeholder.ministry}</p>
        <p>Role: {stakeholder.role}</p>
        <p>Dashboard: {stakeholder.dashboard_path}</p>
        <p>Ceremony Timestamp: {new Date(ceremony_timestamp).toLocaleString()}</p>
      </div>
    </div>
  );
}
