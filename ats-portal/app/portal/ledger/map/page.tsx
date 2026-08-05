"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Cosmic Ledger Map Components */
import CosmicLedgerMap from "@/components/cosmic/CosmicLedgerMap";
import CosmicLedgerAnomalies from "@/components/cosmic/CosmicLedgerAnomalies";
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

/* Original ATS NodeGraph */
function NodeGraph({ nodes, edges }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded">
      <h3 className="text-lg font-semibold mb-3">Financial Flow Map</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((n) => (
          <div
            key={n.id}
            className="bg-slate-800 p-3 rounded border border-slate-700"
          >
            <h4 className="text-slate-200 font-semibold">{n.label}</h4>
            <p className="text-slate-400 text-sm">Module: {n.module}</p>
            <p className="text-slate-400 text-sm">Total: {n.total_usd} USD</p>
          </div>
        ))}
      </div>

      <h4 className="text-slate-300 font-semibold mt-6 mb-2">Flow Edges</h4>
      <ul className="text-slate-400 space-y-2">
        {edges.map((e, idx) => (
          <li key={idx}>
            {e.from} → {e.to} ({e.amount_usd} USD)
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CosmicLedgerFinancialMap() {
  const [map, setMap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMap() {
      const { data, error } = await supabase.rpc("ledger_financial_map");

      if (error) console.error("Ledger Financial Map RPC error:", error);

      setMap(data || null);
      setLoading(false);
    }

    loadMap();
  }, []);

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Ledger Financial Map" />
        <div className="p-6 text-slate-200">Loading financial topology…</div>
      </CosmicPage>
    );
  }

  if (!map) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Ledger Financial Map" />
        <div className="p-6 text-slate-200">No financial map available.</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Ledger Financial Map" />

      {/* Summary Cards */}
      <div className="p-6 text-slate-200">
        <h1 className="text-2xl font-bold mb-6">Multi‑Module Financial Map</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Modules</h2>
            <p className="text-3xl mt-2">{map.module_count}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Edges</h2>
            <p className="text-3xl mt-2">{map.edge_count}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Total Flow</h2>
            <p className="text-3xl mt-2">{map.total_flow_usd} USD</p>
          </div>
        </div>

        {/* Node Graph (Original ATS Chrome) */}
        <NodeGraph nodes={map.nodes} edges={map.edges} />

        <a
          href="/portal/ledger"
          className="inline-block text-blue-400 hover:text-blue-300 mt-6"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Ledger Layer */}
      <div className="space-y-12 mt-12">

        <CosmicLedgerMap />
        <CosmicLedgerAnomalies />
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

        <CosmicMinistrySpirit name="Financial Map Spirit" />
        <CosmicMinistryThrone name="Financial Map Throne" />
        <CosmicMinistryThroneAscended name="Financial Map Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Financial Map — Eternal Throne" />

        <CosmicDivineBeing name="Financial Map — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
