"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function MinerSiteCertificate({ params }) {
  const { id } = params;
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertificate() {
      const { data, error } = await supabase.rpc("get_miner_site_certificate", {
        certificate_id: id,
      });

      if (error) {
        console.error("Miner Site Certificate RPC error:", error);
      }

      setCert(data || null);
      setLoading(false);
    }

    loadCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Mining Site Certificate…</h2>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Certificate not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 text-slate-200 max-w-3xl">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">Mining Site Certificate</h1>

      {/* Certificate Body */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded mb-6">

        <h2 className="text-xl font-semibold mb-2">{cert.site_name}</h2>

        <p className="text-slate-300">Location: {cert.location}</p>
        <p className="text-slate-300">Primary Mineral: {cert.primary_mineral}</p>

        {cert.secondary_minerals?.length > 0 && (
          <p className="text-slate-300">
            Secondary Minerals: {cert.secondary_minerals.join(", ")}
          </p>
        )}

        <p className="text-slate-300 mt-2">
          Total Output: {cert.total_output_kg} kg
        </p>

        <p className="text-slate-300">
          Average Purity: {cert.average_purity}%
        </p>

        <p className="text-slate-300 mt-2">
          Issued: {new Date(cert.created_at).toLocaleString()}
        </p>

        <p className="text-slate-300 mt-2">
          Certificate UUID: {cert.uuid}
        </p>

        {/* QR Code */}
        {cert.qr_url && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-1">Verification QR</h3>
            <img
              src={cert.qr_url}
              alt="Certificate QR"
              className="w-40 h-40 border border-slate-700 rounded"
            />
          </div>
        )}
      </div>

      {/* Cross‑Module Federation */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded mb-6">
        <h2 className="text-xl font-semibold mb-2">Cross‑Module Links</h2>

        {cert.site_id && (
          <p className="text-slate-300">
            Site Profile:{" "}
            <a
              href={`/portal/miners/sites/${cert.site_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Site →
            </a>
          </p>
        )}

        {cert.coordinator_id && (
          <p className="text-slate-300 mt-2">
            Coordinator:{" "}
            <a
              href={`/portal/miners/coordinator/${cert.coordinator_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Coordinator →
            </a>
          </p>
        )}

        {cert.ledger_id && (
          <p className="text-slate-300 mt-2">
            Ledger Entry:{" "}
            <a
              href={`/portal/ledger/${cert.ledger_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Ledger →
            </a>
          </p>
        )}
      </div>

      {/* Back Link */}
      <a
        href="/portal/miners/sites"
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Back to Mining Sites Registry →
      </a>
    </div>
  );
}
