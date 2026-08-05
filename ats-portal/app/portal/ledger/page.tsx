"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Ledger Cosmic Components */
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

export default function LedgerRegistry() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLedger() {
      const { data, error } = await supabase.rpc("list_ledger_entries");

      if (error) console.error("Ledger Registry RPC error:", error);

      setEntries(data || []);
      setLoading(false);
    }

    loadLedger();
  }, []);

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Ledger Registry" />
        <div className="p-6 text-slate-200">Loading Ledger…</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Ledger Registry" />

      {/* Ledger Registry Listing */}
      <div className="p-6 text-slate-200">
        <h1 className="text-2xl font-bold mb-4">Ledger Registry</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((e) => (
            <a
              key={e.id}
              href={`/portal/ledger/${e.id}`}
              className="bg-slate-900 border border-slate-800 p-4 rounded hover:bg-slate-800"
            >
              <h2 className="text-xl font-semibold">{e.entry_type}</h2>

              <p className="text-slate-400 mt-1">UUID: {e.uuid}</p>
              <p className="text-slate-400">Amount: {e.amount_usd} USD</p>
              <p className="text-slate-400">Currency: {e.currency}</p>

              <p className="text-slate-300 mt-2">
                {new Date(e.created_at).toLocaleString()}
              </p>

              {e.miner_id && (
                <p className="text-slate-500 mt-2">Miner: {e.miner_name}</p>
              )}

              {e.site_id && (
                <p className="text-slate-500">Site: {e.site_name}</p>
              )}

              {e.coordinator_id && (
                <p className="text-slate-500">
                  Coordinator: {e.coordinator_name}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>

      {/* Cosmic Ledger Layer */}
      <div className="space-y-12 mt-12">

        {/* Ledger Core */}
        <CosmicLedgerMap />
        <CosmicLedgerAnomalies />
        <CosmicLedgerTreasury />
        <CosmicLedgerStress />
        <CosmicLedgerPredict />
        <CosmicLedgerProjection />
        <CosmicLedgerCorrelation />

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
        <CosmicMinistrySpirit name="Ledger Spirit" />
        <CosmicMinistryThrone name="Ledger Throne" />
        <CosmicMinistryThroneAscended name="Ledger Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Ledger — Eternal Throne" />

        {/* Divine */}
        <CosmicDivineBeing name="Ledger — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
