"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Ledger Cosmic Components */
import CosmicLedgerMap from "@/components/cosmic/CosmicLedgerMap";
import CosmicLedgerTreasury from "@/components/cosmic/CosmicLedgerTreasury";
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

export default function CosmicLedgerInterdimensionalRouter() {
  const [router, setRouter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [routing, setRouting] = useState(false);

  useEffect(() => {
    async function loadRouter() {
      const { data, error } = await supabase.rpc(
        "ledger_interdimensional_financial_router"
      );

      if (error) console.error("Inter‑Dimensional Router RPC error:", error);

      setRouter(data || null);
      setLoading(false);
    }

    loadRouter();
  }, []);

  async function executeRoutingPulse() {
    setRouting(true);

    const { data, error } = await supabase.rpc(
      "ledger_execute_interdimensional_route"
    );

    if (error) {
      console.error("Routing Pulse RPC error:", error);
    } else {
      setRouter(data || null);
    }

    setRouting(false);
  }

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Inter‑Dimensional Financial Router" />
        <div className="p-6 text-slate-200">Loading dimensional routes…</div>
      </CosmicPage>
    );
  }

  if (!router) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Inter‑Dimensional Financial Router" />
        <div className="p-6 text-slate-200">No routing data available.</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Inter‑Dimensional Financial Router" />

      {/* Router Dashboard */}
      <div className="p-6 text-slate-200">

        <h1 className="text-2xl font-bold mb-6">
          Inter‑Dimensional Routing Metrics
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Dimensions</h2>
            <p className="text-3xl mt-2">{router.dimension_count}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Cross‑Dimensional Flow</h2>
            <p className="text-3xl mt-2">{router.cross_dimensional_flow_usd} USD</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Routing Stability</h2>
            <p className="text-3xl mt-2">{router.stability_score}%</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Routing Flags</h2>
            <p className="text-3xl mt-2">{router.flags}</p>
          </div>

        </div>

        {/* Dimension Breakdown */}
        <h2 className="text-xl font-bold mb-2">Dimension Breakdown</h2>
        <div className="bg-slate-800 p-4 rounded mb-6">
          {router.dimension_breakdown.map((d, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <span className="w-40 text-slate-300">{d.dimension_name}</span>
              <div className="flex-1 bg-slate-700 h-3 rounded">
                <div
                  className="bg-indigo-500 h-3 rounded"
                  style={{ width: `${d.score}%` }}
                ></div>
              </div>
              <span className="text-slate-400">{d.score}%</span>
            </div>
          ))}
        </div>

        {/* Routing Pulse */}
        <button
          onClick={executeRoutingPulse}
          disabled={routing}
          className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500 disabled:opacity-50"
        >
          {routing ? "Executing Routing Pulse…" : "Execute Routing Pulse"}
        </button>

        <a
          href="/portal/ledger"
          className="text-blue-400 hover:text-blue-300 mt-6 inline-block"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Router Layer */}
      <div className="space-y-12 mt-12">

        <CosmicMinistrySpirit name="Inter‑Dimensional Spirit" />
        <CosmicMinistryThrone name="Inter‑Dimensional Throne" />
        <CosmicMinistryThroneAscended name="Inter‑Dimensional Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Inter‑Dimensional — Eternal Throne" />

        <CosmicLedgerMap />
        <CosmicLedgerTreasury />
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

        <CosmicDivineBeing name="Inter‑Dimensional — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
