"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function AuditTrailExplorer() {
  const [trail, setTrail] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadTrail() {
    const { data, error } = await supabase
      .from("ats_certificates")
      .select("*")
      .order("issued_at", { ascending: false });

    if (error) {
      console.error("Audit trail error:", error.message);
      return;
    }

    setTrail(data);
    setLoading(false);
  }

  useEffect(() => {
    loadTrail();
  }, []);

  if (loading) {
    return (
      <div className="aura-card p-6">
        <h2 className="text-xl font-bold">Loading Audit Trail...</h2>
      </div>
    );
  }

  return (
    <div className="aura-card p-6">
      <h2 className="text-xl font-bold mb-4">ATS Certificate Audit Trail</h2>

      <ul className="space-y-4">
        {trail.map((entry) => (
          <li
            key={entry.serial}
            className="border rounded bg-white shadow p-4 audit-entry"
          >
            <p>
              <strong>Sector:</strong> {entry.sector}
            </p>
            <p>
              <strong>Serial:</strong> {entry.serial}
            </p>
            <p>
              <strong>Issued:</strong> {entry.issued_at}
            </p>
            <p>
              <strong>INS UUID:</strong> {entry.ins_uuid}
            </p>
            <p>
              <strong>Certificate Path:</strong> {entry.certificate_path}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
