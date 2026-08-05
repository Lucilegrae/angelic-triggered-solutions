"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";

export default function CertificateViewer() {
  useStaffGuard();

  const [cert, setCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCert() {
      try {
        const res = await fetch(`/api/certificates/${id}/profile`);
        const data = await res.json();
        setCert(data);
      } catch (err) {
        console.error("Failed to load certificate:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCert();
  }, [id]);

  if (loading) return <p className="text-slate-400">Loading certificate…</p>;
  if (!cert) return <p className="text-red-400">Certificate not found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Certificate Viewer</h2>

      <div className="bg-slate-900 p-4 rounded border border-slate-800 mb-6">
        <p className="text-slate-300">
          Certificate Number: <span className="font-bold">{cert.certificate_number}</span>
        </p>
        <p className="text-slate-300 mt-2">
          Status: <span className="font-bold">{cert.status}</span>
        </p>
      </div>

      <SealConstellation />
      <GlyphPdfDashboard uuid={id} />
    </div>
  );
}

function SealConstellation() {
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-3">Seal Constellation</h3>
      <div className="seal-constellation">
        {/* Your SealConstellationView component goes here */}
      </div>
    </div>
  );
}
