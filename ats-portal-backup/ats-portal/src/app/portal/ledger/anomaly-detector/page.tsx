"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Ledger Cosmic Components */
import CosmicLedgerAnomalies from "@/components/cosmic/CosmicLedgerAnomalies";
import CosmicLedgerMap from "@/components/cosmic/CosmicLedgerMap";
import CosmicLedgerTreasury from "@/components/cosmic/CosmicLedgerTreasury";
import CosmicLedgerStress from "@/components/cosmic/CosmicLedgerStress";
import CosmicLedgerPredict from "@/components/cosmic/CosmicLedgerPredict";
import CosmicLedgerProjection from "@/components/cosmic/CosmicLedgerProjection";
import CosmicLedgerCorrelation from "@/components/cosmic/CosmicLedgerCorrelation";

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

export default function CosmicLedgerCrossModuleAnomalyDetector() {
  const [anomalies, setAnomalies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    async function loadAnomalies() {
      const { data, error } = await supabase.rpc(
        "ledger_cross_module_anomalies"
      );

      if (error) console.error("Cross‑Module Anomalies RPC error:", error);

      setAnomalies(data || []);
      setLoading(false);
    }

    loadAnomalies();
  }, []);

  async function runScan() {
    setScanning(true);

    const { data, error } = await supabase.rpc(
      "ledger_run_cross_module_scan"
    );

    if (error) {
      console.error("Run Cross‑Module Scan RPC error:", error);
    } else {
      setAnomalies(data || []);
    }

    setScanning(false);
  }

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Cross‑Module Anomaly Detector" />
        <div className="p-6 text-slate-200">Loading anomalies…</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Cross‑Module Anomaly Detector" />

      {/* Anomaly Detector Dashboard */}
      <div className="p-6 text-slate-200">
        <h1 className="text-2xl font-bold mb-6">
          Cross‑Module Anomaly Detector
        </h1>

        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-400">
            Detected anomalies across ledger, GNSS, safety, environment,
            claims, and treasury modules.
          </p>
          <button
            onClick={runScan}
            disabled={scanning}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 disabled:opacity-50"
          >
            {scanning ? "Scanning…" : "Run Cross‑Module Scan"}
          </button>
        </div>

        {anomalies.length === 0 && (
          <p className="text-slate-400">No anomalies detected.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anomalies.map((a) => (
            <div
              key={a.id}
              className="bg-slate-900 border border-slate-800 p-4 rounded"
            >
              <h2 className="text-lg font-semibold">
                {a.category} — {a.severity}
              </h2>

              <p className="text-slate-400 mt-2">
                Modules: {a.modules_joined}
              </p>

              <p className="text-slate-400 mt-1">
                Ledger Ref: {a.ledger_reference}
              </p>

              <p className="text-slate-400 mt-2">
                Description: {a.description}
              </p>

              <p className="text-slate-500 mt-2 text-sm">
                Detected: {new Date(a.detected_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <a
          href="/portal/ledger"
          className="inline-block text-blue-400 hover:text-blue-300 mt-6"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Anomaly Layer */}
      <div className="space-y-12 mt-12">
        <CosmicLedgerAnomalies />
        <CosmicLedgerMap />
        <CosmicLedgerTreasury />
        <CosmicLedgerStress />
        <CosmicLedgerPredict />
        <CosmicLedgerProjection />
        <CosmicLedgerCorrelation />

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

        <CosmicHeatmap values={[91, 80, 76, 68, 84]} />
        <CosmicWorkflowVisualizer />
        <CosmicConstellationEngine />
        <CosmicOrbitSimulation />
        <CosmicWormhole />

        <CosmicMinistrySpirit name="Anomaly Spirit" />
        <CosmicMinistryThrone name="Anomaly Throne" />
        <CosmicMinistryThroneAscended name="Anomaly Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Anomaly — Eternal Throne" />

        <CosmicDivineBeing name="Anomaly — Divine Being" />
        <CosmicAstralDivination />
      </div>
    </CosmicPage>
  );
}
