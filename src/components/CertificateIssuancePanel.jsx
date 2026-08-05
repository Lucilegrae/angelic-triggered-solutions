"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { loadSectorCrest } from "../../utils/sectorLoader";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function CertificateIssuancePanel() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCertificates() {
    const { data, error } = await supabase
      .from("ats_certificates")
      .select("*")
      .order("issued_at", { ascending: false });

    if (error) {
      console.error("Error loading certificates:", error.message);
      return;
    }

    const enriched = data.map((row) => ({
      ...row,
      crest: loadSectorCrest(row.sector)
    }));

    setCerts(enriched);
    setLoading(false);
  }

  useEffect(() => {
    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className="p-6 aura-card">
        <h2 className="text-xl font-bold">Loading Certificates...</h2>
      </div>
    );
  }

  return (
    <div className="p-6 aura-card">
      <h2 className="text-xl font-bold mb-4">ATS Certificate Issuance</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((c) => (
          <div key={c.serial} className="border rounded bg-white shadow p-4">
            <img
              src={c.crest}
              alt="Sector Crest"
              className="w-32 h-32 object-contain mx-auto mb-4"
            />

            <h3 className="text-lg font-bold text-center">{c.sector}</h3>

            <div className="mt-4 text-sm">
              <p><strong>Holder:</strong> {c.ins_uuid}</p>
              <p><strong>Serial:</strong> {c.serial}</p>
              <p><strong>Issued:</strong> {c.issued_at}</p>
              <p><strong>Certificate:</strong> {c.certificate_path}</p>
            </div>

            <div className="mt-4">
              <a
                href={c.certificate_path}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Certificate
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
