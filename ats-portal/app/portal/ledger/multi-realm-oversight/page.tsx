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

/* Analytics */
import CosmicHeatmap from "@/components/cosmic/CosmicHeatmap";
import CosmicWorkflowVisualizer from "@/components/cosmic/CosmicWorkflowVisualizer";
import CosmicConstellationEngine from "@/components/cosmic/CosmicConstellationEngine";
import CosmicOrbitSimulation from "@/components/cosmic/CosmicOrbitSimulation";
import CosmicWormhole from "@/components/cosmic/CosmicWormhole";

/* Ministry / Council */
import CosmicMinistrySpirit from "@/components/cosmic/CosmicMinistrySpirit";
import CosmicMinistryThrone from "@/components/cosmic/CosmicMinistryThrone";
import CosmicMinistryThroneAscended from "@/components/cosmic/CosmicMinistryThroneAscended";
import CosmicMinistryThroneEternal from "@/components/cosmic/CosmicMinistryThroneEternal";

/* Divine */
import CosmicDivineBeing from "@/components/cosmic/CosmicDivineBeing";
import CosmicAstralDivination from "@/components/cosmic/CosmicAstralDivination";

export default function CosmicLedgerMultiRealmOversightNexus() {
  const [nexus, setNexus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNexus() {
      const { data, error } = await supabase.rpc(
        "ledger_multi_realm_oversight_nexus"
      );

      if (error) console.error("Multi‑Realm Oversight RPC error:", error);

      setNexus(data || null);
      setLoading(false);
    }

    loadNexus();
  }, []);

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Multi‑Realm Oversight Nexus" />
        <div className="p-6 text-slate-200">Loading multi‑realm oversight…</div>
      </CosmicPage>
    );
  }

  if (!nexus) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Multi‑Realm Oversight Nexus" />
        <div className="p-6 text-slate-200">No oversight data available.</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Multi‑Realm Oversight Nexus" />

      <div className="p-6 text-slate-200">

        <h1 className="text-2xl font-bold mb-6">Realm Oversight Metrics</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Realms</h2>
            <p className="text-3xl mt-2">{nexus.realm_count}</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Realm Stability</h2>
            <p className="text-3xl mt-2">{nexus.stability_score}%</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Cross‑Realm Flow</h2>
            <p className="text-3xl mt-2">{nexus.cross_realm_flow_usd} USD</p>
          </div>

          <div className="bg-slate-900 p-4 rounded border border-slate-800">
            <h2 className="text-lg font-semibold">Oversight Flags</h2>
            <p className="text-3xl mt-2">{nexus.flags}</p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-2">Realm Breakdown</h2>
        <div className="bg-slate-800 p-4 rounded mb-6">
          {nexus.realm_breakdown.map((r, i) => (
            <div key={i} className="flex items-center gap-4 mb-2">
              <span className="w-40 text-slate-300">{r.realm_name}</span>
              <div className="flex-1 bg-slate-700 h-3 rounded">
                <div
                  className="bg-purple-500 h-3 rounded"
                  style={{ width: `${r.score}%` }}
                ></div>
              </div>
              <span className="text-slate-400">{r.score}%</span>
            </div>
          ))}
        </div>

        <a
          href="/portal/ledger"
          className="text-blue-400 hover:text-blue-300 mt-6 inline-block"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Layer */}
      <div className="space-y-12 mt-12">
        <CosmicMinistrySpirit name="Multi‑Realm Spirit" />
        <CosmicMinistryThrone name="Multi‑Realm Throne" />
        <CosmicMinistryThroneAscended name="Multi‑Realm Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Multi‑Realm — Eternal Throne" />

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

        <CosmicDivineBeing name="Multi‑Realm — Divine Being" />
        <CosmicAstralDivination />
      </div>
    </CosmicPage>
  );
}
