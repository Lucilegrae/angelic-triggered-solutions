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

export default function CosmicLedgerNationalTreasuryCommandCenter() {
  const [treasury, setTreasury] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    async function loadTreasury() {
      const { data, error } = await supabase.rpc(
        "ledger_national_treasury_command_center"
      );

      if (error) console.error("Treasury Command RPC error:", error);

      setTreasury(data || null);
      setLoading(false);
    }

    loadTreasury();
  }, []);

  async function executeTreasuryPulse() {
    setExecuting(true);

    const { data, error } = await supabase.rpc(
      "ledger_run_treasury_pulse"
    );

    if (error) {
      console.error("Treasury Pulse RPC error:", error);
    } else {
      setTreasury(data || null);
    }

    setExecuting(false);
  }

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="National Treasury Command Center" />
        <div className="p-6 text-slate-200">Loading national treasury…</div>
      </CosmicPage>
    );
  }

  if (!treasury) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="National Treasury Command Center" />
        <div className="p-6 text-slate-200">No treasury data available.</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="National Treasury Command Center" />

      {/* Treasury Command Dashboard */}
      <div className="p-6 text-slate-200">

        <h1 className="text-2xl font-bold mb-6">National Treasury Metrics</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Total Liquidity</h2>
            <p className="text-3xl mt-2">{treasury.total_liquidity_usd} USD</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">National Flow</h2>
            <p className="text-3xl mt-2">{treasury.national_flow_usd} USD</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Treasury Stability</h2>
            <p className="text-3xl mt-2">{treasury.stability_score}%</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Active Treasury Flags</h2>
            <p className="text-3xl mt-2">{treasury.flags}</p>
          </div>

        </div>

        {/* Treasury Breakdown */}
        <h2 className="text-xl font-bold mb-2">Treasury Breakdown</h2>
        <div className="bg-slate-800 p-4 rounded mb-6">
          {treasury.breakdown.map((b, i) => (
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

        {/* Treasury Flags */}
        <h2 className="text-xl font-bold mb-2">Treasury Flags</h2>
        <div className="bg-slate-800 p-4 rounded mb-6">
          {treasury.flag_list.map((f, i) => (
            <div key={i} className="mb-3">
              <h3 className="text-slate-200 font-semibold">{f.title}</h3>
              <p className="text-slate-400">{f.description}</p>
              <p className="text-slate-500 text-sm mt-1">
                Module: {f.module} — Severity: {f.severity}
              </p>
            </div>
          ))}
        </div>

        {/* Treasury Pulse */}
        <button
          onClick={executeTreasuryPulse}
          disabled={executing}
          className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-500 disabled:opacity-50"
        >
          {executing ? "Executing Treasury Pulse…" : "Execute Treasury Pulse"}
        </button>

        <a
          href="/portal/ledger"
          className="inline-block text-blue-400 hover:text-blue-300 mt-6"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Treasury Command Layer */}
      <div className="space-y-12 mt-12">

        <CosmicMinistrySpirit name="Treasury Command Spirit" />
        <CosmicMinistryThrone name="Treasury Command Throne" />
        <CosmicMinistryThroneAscended name="Treasury Command Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Treasury Command — Eternal Throne" />

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

        <CosmicDivineBeing name="Treasury Command — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
