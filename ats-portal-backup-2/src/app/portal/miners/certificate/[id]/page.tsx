"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

export default function MinerCertificate({ params }) {
  const { id } = params;
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCertificate() {
      const { data, error } = await supabase.rpc("get_miner_certificate", {
        certificate_id: id,
      });

      if (error) {
        console.error("Miner Certificate RPC error:", error);
      }

      setCert(data || null);
      setLoading(false);
    }

    loadCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-slate-200">
        <h2>Loading Miner Certificate…</h2>
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
      <h1 className="text-3xl font-bold mb-4">Mining Certificate</h1>

      {/* Certificate Body */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded mb-6">

        <h2 className="text-xl font-semibold mb-2">{cert.miner_name}</h2>

        <p className="text-slate-300">Mineral: {cert.mineral_type}</p>
        <p className="text-slate-300">Mining Site: {cert.site_name}</p>
        <p className="text-slate-300">Output: {cert.output_kg} kg</p>
        <p className="text-slate-300">Purity: {cert.purity}%</p>

        <p className="text-slate-300 mt-2">
          Payout Value: {cert.payout_value} USD
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

        {cert.miner_id && (
          <p className="text-slate-300">
            Miner Profile:{" "}
            <a
              href={`/portal/miners/${cert.miner_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Miner →
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

        {cert.institution_id && (
          <p className="text-slate-300 mt-2">
            Institution:{" "}
            <a
              href={`/portal/institutions/${cert.institution_id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              View Institution →
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
        href="/portal/miners"
        className="inline-block text-blue-400 hover:text-blue-300"
      >
        Back to Miners Registry →
      </a>
    </div>
  );
}
