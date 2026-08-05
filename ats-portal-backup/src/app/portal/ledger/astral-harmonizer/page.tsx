"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Ledger Cosmic Components */
import CosmicLedgerTreasury from "@/components/cosmic/CosmicLedgerTreasury";
import CosmicLedgerMap from "@/components/cosmic/CosmicLedgerMap";
import CosmicLedgerStress from "@/components/cosmic/CosmicLedgerStress";
import CosmicLedgerPredict from "@/components/cosmic/CosmicLedgerPredict";
import CosmicLedgerProjection from "@/components/cosmic/CosmicLedgerProjection";
import CosmicLedgerCorrelation from "@/components/cosmic/CosmicLedgerCorrelation";
import CosmicLedgerAnomalies from "@/components/cosmic/CosmicLedgerAnomalies";

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

/* Ministry / Council Layer */
import CosmicMinistrySpirit from "@/components/cosmic/CosmicMinistrySpirit";
import CosmicMinistryThrone from "@/components/cosmic/CosmicMinistryThrone";
import CosmicMinistryThroneAscended from "@/components/cosmic/CosmicMinistryThroneAscended";
import CosmicMinistryThroneEternal from "@/components/cosmic/CosmicMinistryThroneEternal";

/* Divine Layer */
import CosmicDivineBeing from "@/components/cosmic/CosmicDivineBeing";
import CosmicAstralDivination from "@/components/cosmic/CosmicAstralDivination";

export default function CosmicLedgerAstralTreasuryHarmonizer() {
  const [harmonizer, setHarmonizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [harmonizing, setHarmonizing] = useState(false);

  useEffect(() => {
    async function loadHarmonizer() {
      const { data, error } = await supabase.rpc(
        "ledger_astral_treasury_harmonizer"
      );

      if (error) console.error("Astral Harmonizer RPC error:", error);

      setHarmonizer(data || null);
      setLoading(false);
    }

    loadHarmonizer();
  }, []);

  async function executeHarmonicPulse() {
    setHarmonizing(true);

    const { data, error } = await supabase.rpc(
      "ledger_execute_astral_harmonic_pulse"
    );

    if (error) {
      console.error("Astral Harmonic Pulse RPC error:", error);
    } else {
      setHarmonizer(data || null);
    }

    setHarmonizing(false);
  }

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Astral Treasury Harmonizer" />
        <div className="p-6 text-slate-200">Loading astral harmonics…</div>
      </CosmicPage>
    );
  }

  if (!harmonizer) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Astral Treasury Harmonizer" />
        <div className="p-6 text-slate-200">No harmonizer data available.</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Astral Treasury Harmonizer" />

      {/* Astral Harmonizer Dashboard */}
      <div className="p-6 text-slate-200">

        <h1 className="text-2xl font-bold mb-6">
          Astral Treasury Harmonic Metrics
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Astral Layers</h2>
            <p className="text-3xl mt-2">{harmonizer.astral_layer_count}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Harmonic Balance</h2>
            <p className="text-3xl mt-2">{harmonizer.harmonic_balance_score}%</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Astral Flow</h2>
            <p className="text-3xl mt-2">{harmonizer.astral_flow_usd} USD</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Harmonic Flags</h2>
            <p className="text-3xl mt-2">{harmonizer.flags}</p>
          </div>

        </div>

        {/* Astral Layer Breakdown */}
        <h2 className="text-xl font-bold mb-2">Astral Layer Breakdown</h2>
        <div className="bg-slate-800 p-4 rounded mb-6">
          {harmonizer.astral_breakdown.map((a, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <span className="w-40 text-slate-300">{a.layer_name}</span>
              <div className="flex-1 bg-slate-700 h-3 rounded">
                <div
                  className="bg-pink-500 h-3 rounded"
                  style={{ width: `${a.score}%` }}
                ></div>
              </div>
              <span className="text-slate-400">{a.score}%</span>
            </div>
          ))}
        </div>

        {/* Harmonic Pulse */}
        <button
          onClick={executeHarmonicPulse}
          disabled={harmonizing}
          className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-500 disabled:opacity-50"
        >
          {harmonizing ? "Executing Harmonic Pulse…" : "Execute Harmonic Pulse"}
        </button>

        <a
          href="/portal/ledger"
          className="text-blue-400 hover:text-blue-300 mt-6 inline-block"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Astral Layer */}
      <div className="space-y-12 mt-12">

        <CosmicMinistrySpirit name="Astral Treasury Spirit" />
        <CosmicMinistryThrone name="Astral Treasury Throne" />
        <CosmicMinistryThroneAscended name="Astral Treasury Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Astral Treasury — Eternal Throne" />

        <CosmicLedgerTreasury />
        <CosmicLedgerMap />
        <CosmicLedgerStress />
        <CosmicLedgerPredict />
        <CosmicLedgerProjection />
        <CosmicLedgerCorrelation />
        <CosmicLedgerAnomalies />

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

        <CosmicDivineBeing name="Astral Treasury — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
