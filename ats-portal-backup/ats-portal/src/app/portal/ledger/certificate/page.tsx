"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Cosmic Certificate Components */
import CosmicCertificateHalo from "@/components/cosmic/CosmicCertificateHalo";
import CosmicCertificateSeal from "@/components/cosmic/CosmicCertificateSeal";
import CosmicCertificateAstral from "@/components/cosmic/CosmicCertificateAstral";
import CosmicCertificateOrbital from "@/components/cosmic/CosmicCertificateOrbital";
import CosmicCertificateWormhole from "@/components/cosmic/CosmicCertificateWormhole";

/* GNSS / Astral Components */
import CosmicGNSSConstellation from "@/components/cosmic/CosmicGNSSConstellation";
import CosmicGNSSStarfield from "@/components/cosmic/CosmicGNSSStarfield";
import CosmicGNSSOrbital from "@/components/cosmic/CosmicGNSSOrbital";
import CosmicGNSSOrbitalV2 from "@/components/cosmic/CosmicGNSSOrbitalV2";
import CosmicGNSSAstral from "@/components/cosmic/CosmicGNSSAstral";

/* Analytics Layer */
import CosmicHeatmap from "@/components/cosmic/CosmicHeatmap";
import CosmicWorkflowVisualizer from "@/components/cosmic/CosmicWorkflowVisualizer";
import CosmicConstellationEngine from "@/components/cosmic/CosmicConstellationEngine";
import CosmicOrbitSimulation from "@/components/cosmic/CosmicOrbitSimulation";
import CosmicWormhole from "@/components/cosmic/CosmicWormhole";

/* Ministry Layer */
import CosmicMinistrySpirit from "@/components/cosmic/CosmicMinistrySpirit";
import CosmicMinistryThrone from "@/components/cosmic/CosmicMinistryThrone";
import CosmicMinistryThroneAscended from "@/components/cosmic/CosmicMinistryThroneAscended";
import CosmicMinistryThroneEternal from "@/components/cosmic/CosmicMinistryThroneEternal";

/* Divine Layer */
import CosmicDivineBeing from "@/components/cosmic/CosmicDivineBeing";
import CosmicAstralDivination from "@/components/cosmic/CosmicAstralDivination";

export default function CosmicLedgerCertificateGenerator() {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function loadEntry() {
      const { data, error } = await supabase.rpc("ledger_certificate_metadata");

      if (error) {
        console.error("Certificate Metadata RPC error:", error);
      }

      setEntry(data || null);
      setLoading(false);
    }

    loadEntry();
  }, []);

  async function generateCertificate() {
    setGenerating(true);

    const { data, error } = await supabase.rpc("generate_ledger_certificate", {
      ledger_id: entry.id,
    });

    if (error) {
      console.error("Certificate Generation RPC error:", error);
      setResult({ error: true, message: error.message });
    } else {
      setResult({ error: false, path: data.output_path });
    }

    setGenerating(false);
  }

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Ledger Certificate Generator" />
        <div className="p-6 text-slate-200">Loading Certificate Metadata…</div>
      </CosmicPage>
    );
  }

  if (!entry) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Ledger Certificate Generator" />
        <div className="p-6 text-slate-200">No certificate metadata available.</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Ledger Certificate Generator" />

      {/* Certificate Metadata */}
      <div className="p-6 text-slate-200">
        <h1 className="text-2xl font-bold mb-4">Certificate Metadata</h1>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded mb-6">
          <p className="text-slate-300">Entry Type: {entry.entry_type}</p>
          <p className="text-slate-300">UUID: {entry.uuid}</p>
          <p className="text-slate-300">Serial: {entry.serial}</p>
          <p className="text-slate-300">Sector: {entry.sector}</p>
          <p className="text-slate-300">Stakeholder: {entry.stakeholder}</p>
          <p className="text-slate-300">Date: {entry.date}</p>
        </div>

        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          onClick={generateCertificate}
          disabled={generating}
        >
          {generating ? "Generating…" : "Generate Certificate"}
        </button>

        {result && (
          <div
            className={`mt-4 p-3 rounded ${
              result.error ? "bg-red-800" : "bg-green-800"
            }`}
          >
            {result.error ? (
              <p>{result.message}</p>
            ) : (
              <p>Certificate Generated: {result.path}</p>
            )}
          </div>
        )}
      </div>

      {/* Cosmic Certificate Layer */}
      <div className="space-y-12 mt-12">

        {/* Certificate Core */}
        <CosmicCertificateHalo />
        <CosmicCertificateSeal />
        <CosmicCertificateAstral />
        <CosmicCertificateOrbital />
        <CosmicCertificateWormhole />

        {/* GNSS / Astral */}
        <CosmicGNSSConstellation />

        <CosmicGNSSStarfield
          points={[
            { x: 80, y: 120 },
            { x: 200, y: 200 },
            { x: 300, y: 140 },
            { x: 150, y: 300 },
          ]}
        />

        <CosmicGNSSOrbital />
        <CosmicGNSSOrbitalV2 />
        <CosmicGNSSAstral />

        {/* Analytics */}
        <CosmicHeatmap values={[91, 80, 76, 68, 84]} />
        <CosmicWorkflowVisualizer />
        <CosmicConstellationEngine />
        <CosmicOrbitSimulation />
        <CosmicWormhole />

        {/* Ministry */}
        <CosmicMinistrySpirit name="Certificate Spirit" />
        <CosmicMinistryThrone name="Certificate Throne" />
        <CosmicMinistryThroneAscended name="Certificate Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Certificate — Eternal Throne" />

        {/* Divine */}
        <CosmicDivineBeing name="Certificate — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
