"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CertificateVerificationUI() {
  const searchParams = useSearchParams();
  const [record, setRecord] = useState<any>(null);
  const [status, setStatus] = useState("loading");
  const [auth, setAuth] = useState<any>(null);
  const [seal, setSeal] = useState<any>(null);

  const id = searchParams.get("id");
  const type = "certificate";

  useEffect(() => {
    async function load() {
      if (!id) return;

      // 1. Verify certificate
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type }),
      });

      const data = await res.json();
      setStatus(data.status);

      // If revoked, store record for UI
      if (data.status === "revoked") {
        setRecord(data);
        return;
      }

      if (data.status === "verified") {
        setRecord(data.record);

        // 2. Fetch authenticity score
        const authRes = await fetch("/api/certificate/authenticity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ certificate_id: id }),
        });

        const authData = await authRes.json();
        setAuth(authData);

        // 3. Fetch Golden Star Seal
        const sealRes = await fetch("/api/certificate/seal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ certificate_id: id }),
        });

        const sealData = await sealRes.json();
        setSeal(sealData);
      }
    }

    load();
  }, [id]);

  // -----------------------------
  // NO ID PROVIDED
  // -----------------------------
  if (!id) {
    return (
      <div className="p-6 aura-card">
        <h2 className="text-xl font-bold">Certificate Verification</h2>
        <p className="mt-2">No certificate ID provided.</p>
      </div>
    );
  }

  // -----------------------------
  // LOADING
  // -----------------------------
  if (status === "loading") {
    return <div className="p-6 aura-card">Verifying certificate...</div>;
  }

  // -----------------------------
  // NOT FOUND
  // -----------------------------
  if (status === "not_found") {
    return (
      <div className="p-6 aura-card bg-red-50 text-red-700">
        <h2 className="text-xl font-bold">Certificate Not Found</h2>
        <p className="mt-2">This certificate does not exist or is invalid.</p>
      </div>
    );
  }

  // -----------------------------
  // REVOKED CERTIFICATE
  // -----------------------------
  if (status === "revoked") {
    return (
      <div className="p-6 aura-card bg-red-50 text-red-700">
        <h2 className="text-xl font-bold mb-4">Certificate Revoked</h2>

        <p><strong>Reason:</strong> {record?.reason}</p>
        <p><strong>Authority:</strong> {record?.authority}</p>
        <p><strong>Timestamp:</strong> {record?.timestamp}</p>

        <div className="mt-4">
          <a
            href={`/audit-trail?qr_id=${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Revocation Audit Trail
          </a>
        </div>
      </div>
    );
  }

  if (status === "forged") {
    return (
      <div className="p-6 aura-card bg-red-50 text-red-700">
        <h2 className="text-xl font-bold mb-4">Forgery Detected</h2>

        <p><strong>Score:</strong> {record?.score}</p>
        <p><strong>Reason:</strong> {record?.reason}</p>
        <p><strong>Authority:</strong> {record?.authority}</p>
        <p><strong>Timestamp:</strong> {record?.timestamp}</p>

        <div className="mt-4">
          <a
            href={`/audit-trail?qr_id=${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Forgery Audit Trail
          </a>
        </div>
      </div>
    );
  }

  // -----------------------------
  // VERIFIED CERTIFICATE
  // -----------------------------
  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS Certificate Verification</h2>

      <div className="border rounded bg-white shadow p-4">
        <h3 className="text-lg font-bold mb-2">Certificate Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Certificate ID:</strong> {record.id}</p>
            <p><strong>Holder:</strong> {record.name}</p>
            <p><strong>Sector:</strong> {record.sector}</p>
            <p><strong>Issued:</strong> {record.issued_at}</p>
            <p><strong>Serial:</strong> {record.serial}</p>
          </div>

          <div>
            <p><strong>Status:</strong> Verified ✔</p>
            <p><strong>Authenticity:</strong> ATS Golden Star Seal</p>
            <p><strong>Verification Time:</strong> {new Date().toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Certificate Preview</h3>
          <img
            src={record.certificate_path}
            alt="Certificate"
            className="border rounded shadow w-full max-w-lg"
          />
        </div>

        {/* ------------------------------ */}
        {/* AUTHENTICITY SCORE BLOCK        */}
        {/* ------------------------------ */}
        {auth && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-bold mb-2">Authenticity Score</h3>
            <p className="text-3xl font-bold">{auth.score}/100</p>
            <p className="text-md font-semibold">{auth.rating}</p>

            <h4 className="font-bold mt-4">Reasons</h4>
            <ul className="list-disc ml-6 text-sm">
              {auth.reasons?.map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ------------------------------ */}
        {/* GOLDEN STAR SEAL BLOCK         */}
        {/* ------------------------------ */}
        {seal && (
          <div className="mt-6 p-4 border rounded bg-yellow-50">
            <h3 className="text-lg font-bold mb-2">Golden Star Seal</h3>
            <p className="text-2xl font-bold capitalize">{seal.tier.replace("_", " ")}</p>
            <p className="text-md font-semibold">{seal.message}</p>
            <p className="text-sm mt-2">Seal Integrity Score: {seal.score}/100</p>
          </div>
        )}

        <div className="mt-6">
          <a
            href={`/audit-trail?qr_id=${record.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Audit Trail
          </a>
        </div>
      </div>
    </div>
  );
}
