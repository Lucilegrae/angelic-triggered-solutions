"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function Vision() {
  const [stats, setStats] = useState({
    totalCerts: 0,
    sectors: {}
  });

  const [loading, setLoading] = useState(true);

  async function loadVision() {
    const { data, error } = await supabase
      .from("ats_certificates")
      .select("sector");

    if (error) {
      console.error("Vision load error:", error.message);
      return;
    }

    const sectorCounts = {};

    data.forEach((row) => {
      const key = row.sector;
      sectorCounts[key] = (sectorCounts[key] || 0) + 1;
    });

    setStats({
      totalCerts: data.length,
      sectors: sectorCounts
    });

    setLoading(false);
  }

  useEffect(() => {
    loadVision();
  }, []);

  if (loading) {
    return (
      <div className="aura-card p-6">
        <h2 className="text-xl font-bold">Loading Federation Vision...</h2>
      </div>
    );
  }

  return (
    <div className="aura-card p-6">
      <h2 className="text-2xl font-bold mb-4 constellation-glyph">
        ✦ ATS Federation Vision ✦
      </h2>

      <div className="mb-6">
        <p className="text-lg">
          <strong>Total Certificates Issued:</strong> {stats.totalCerts}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Sector Distribution</h3>

      <ul className="space-y-2">
        {Object.entries(stats.sectors).map(([sector, count]) => (
          <li key={sector} className="p-2 bg-white shadow rounded">
            <strong>{sector}</strong>: {count}
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 bg-black text-white rounded shadow">
        <h3 className="text-lg font-bold mb-2">Federation Insight</h3>
        <p className="text-sm opacity-80">
          The ATS Federation continues expanding across all sectors, with
          certificates serving as ceremonial anchors of legitimacy, unity,
          and governance alignment.
        </p>
      </div>
    </div>
  );
}
