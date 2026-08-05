"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Ledger Cosmic Components */
import CosmicLedgerTreasury from "@/components/cosmic/CosmicLedgerTreasury";
import CosmicLedgerAnomalies from "@/components/cosmic/CosmicLedgerAnomalies";
import CosmicLedgerStress from "@/components/cosmic/CosmicLedgerStress";
import CosmicLedgerPredict from "@/components/cosmic/CosmicLedgerPredict";
import CosmicLedgerProjection from "@/components/cosmic/CosmicLedgerProjection";
import CosmicLedgerCorrelation from "@/components/cosmic/CosmicLedgerCorrelation";
import CosmicLedgerMap from "@/components/cosmic/CosmicLedgerMap";

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

export default function CosmicLedgerTreasuryDeepScan() {
  const [scan, setScan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    async function loadScan() {
      const { data, error } = await supabase.rpc("ledger_treasury_deep_scan");

      if (error) console.error("Treasury Deep Scan RPC error:", error);

      setScan(data || null);
      setLoading(false);
    }

    loadScan();
  }, []);

  async function runDeepScan() {
    setRunning(true);

    const { data, error } = await supabase.rpc("ledger_run_treasury_scan");

    if (error) {
      console.error("Run Treasury Scan RPC error:", error);
    } else {
      setScan(data || null);
    }

    setRunning(false);
  }

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Treasury Deep‑Scan Engine" />
        <div className="p-6 text-slate-200">Loading treasury metrics…</div>
      </CosmicPage>
    );
  }

  if (!scan) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Treasury Deep‑Scan Engine" />
        <div className="p-6 text-slate-200">No treasury scan available.</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Treasury Deep‑Scan Engine" />

      {/* Treasury Deep‑Scan Dashboard */}
      <div className="p-6 text-slate-200">

        <h1 className="text-2xl font-bold mb-6">Treasury Metrics</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Liquidity</h2>
            <p className="text-3xl mt-2">{scan.liquidity_score}%</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Treasury Flow</h2>
            <p className="text-3xl mt-2">{scan.total_flow_usd} USD</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Risk Level</h2>
            <p className="text-3xl mt-2">{scan.risk_level}%</p>
          </div>

        </div>

        {/* Treasury Breakdown */}
        <h2 className="text-xl font-bold mb-2">Treasury Breakdown</h2>
        <div className="bg-slate-800 p-4 rounded mb-6">
          {scan.breakdown.map((b, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <span className="w-40 text-slate-300">{b.label}</span>
              <div className="flex-1 bg-slate-700 h-3 rounded">
                <div
                  className="bg-yellow-500 h-3 rounded"
                  style={{ width: `${b.value}%` }}
                ></div>
              </div>
              <span className="text-slate-400">{b.value}%</span>
            </div>
          ))}
        </div>

        {/* Run Deep Scan */}
        <button
          onClick={runDeepScan}
          disabled={running}
          className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-500"
        >
          {running ? "Running Deep‑Scan…" : "Run Deep‑Scan"}
        </button>

        <a
          href="/portal/ledger"
          className="inline-block text-blue-400 hover:text-blue-300 mt-6"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Treasury Layer */}
      <div className="space-y-12 mt-12">

        <CosmicLedgerTreasury />
        <CosmicLedgerAnomalies />
        <CosmicLedgerStress />
        <CosmicLedgerPredict />
        <CosmicLedgerProjection />
        <CosmicLedgerCorrelation />
        <CosmicLedgerMap />

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

        <CosmicMinistrySpirit name="Treasury Spirit" />
        <CosmicMinistryThrone name="Treasury Throne" />
        <CosmicMinistryThroneAscended name="Treasury Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Treasury — Eternal Throne" />

        <CosmicDivineBeing name="Treasury — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
