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

/* Ministry Layer */
import CosmicMinistrySpirit from "@/components/cosmic/CosmicMinistrySpirit";
import CosmicMinistryThrone from "@/components/cosmic/CosmicMinistryThrone";
import CosmicMinistryThroneAscended from "@/components/cosmic/CosmicMinistryThroneAscended";
import CosmicMinistryThroneEternal from "@/components/cosmic/CosmicMinistryThroneEternal";

/* Divine Layer */
import CosmicDivineBeing from "@/components/cosmic/CosmicDivineBeing";
import CosmicAstralDivination from "@/components/cosmic/CosmicAstralDivination";

export default function CosmicLedgerProcurementFlowEngine() {
  const [flow, setFlow] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFlow() {
      const { data, error } = await supabase.rpc(
        "ledger_procurement_flow_engine"
      );

      if (error) console.error("Procurement Flow RPC error:", error);

      setFlow(data || null);
      setLoading(false);
    }

    loadFlow();
  }, []);

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Procurement Flow Engine" />
        <div className="p-6 text-slate-200">Loading procurement flows…</div>
      </CosmicPage>
    );
  }

  if (!flow) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Procurement Flow Engine" />
        <div className="p-6 text-slate-200">No procurement flow data.</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Procurement Flow Engine" />

      {/* Procurement Flow Dashboard */}
      <div className="p-6 text-slate-200">
        <h1 className="text-2xl font-bold mb-6">Procurement Flow Metrics</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Total Procurement Value</h2>
            <p className="text-3xl mt-2">{flow.total_value_usd} USD</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Active Suppliers</h2>
            <p className="text-3xl mt-2">{flow.active_suppliers}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Average Bag Cost</h2>
            <p className="text-3xl mt-2">{flow.avg_bag_cost_usd} USD</p>
          </div>
        </div>

        {/* Flow by Site / Region */}
        <h2 className="text-xl font-bold mb-2">Site / Region Flow</h2>
        <div className="bg-slate-800 p-4 rounded mb-6">
          {flow.site_flow.map((s, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <span className="w-40 text-slate-300">{s.site_name}</span>
              <div className="flex-1 bg-slate-700 h-3 rounded">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{ width: `${s.total_usd}%` }}
                ></div>
              </div>
              <span className="text-slate-400">{s.total_usd} USD</span>
            </div>
          ))}
        </div>

        {/* Flow by Supplier */}
        <h2 className="text-xl font-bold mb-2">Supplier Flow</h2>
        <div className="bg-slate-800 p-4 rounded mb-6">
          {flow.supplier_flow.map((s, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <span className="w-40 text-slate-300">{s.supplier_name}</span>
              <div className="flex-1 bg-slate-700 h-3 rounded">
                <div
                  className="bg-blue-500 h-3 rounded"
                  style={{ width: `${s.total_usd}%` }}
                ></div>
              </div>
              <span className="text-slate-400">{s.total_usd} USD</span>
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

      {/* Cosmic Procurement Layer */}
      <div className="space-y-12 mt-12">
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

        <CosmicMinistrySpirit name="Procurement Spirit" />
        <CosmicMinistryThrone name="Procurement Throne" />
        <CosmicMinistryThroneAscended name="Procurement Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Procurement — Eternal Throne" />

        <CosmicDivineBeing name="Procurement — Divine Being" />
        <CosmicAstralDivination />
      </div>
    </CosmicPage>
  );
}
