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

export default function CosmicLedgerAuditTrail() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuditTrail() {
      const { data, error } = await supabase.rpc("ledger_audit_trail");

      if (error) {
        console.error("Audit Trail RPC error:", error);
      }

      setLogs(data || []);
      setLoading(false);
    }

    loadAuditTrail();
  }, []);

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Ledger Audit Trail" />
        <div className="p-6 text-slate-200">Loading audit trail…</div>
      </CosmicPage>
    );
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Ledger Audit Trail" />

      {/* Audit Trail Viewer */}
      <div className="p-6 text-slate-200">
        <h1 className="text-2xl font-bold mb-4">Audit Trail</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-900 border border-slate-800 p-4 rounded"
            >
              <h2 className="text-xl font-semibold">{log.action}</h2>

              <p className="text-slate-400 mt-2">
                Actor: {log.actor_name} ({log.actor_role})
              </p>

              <p className="text-slate-400">
                Ledger Entry: {log.ledger_id}
              </p>

              <p className="text-slate-400 mt-2">
                Details: {log.details}
              </p>

              <p className="text-slate-500 mt-2">
                Timestamp: {new Date(log.timestamp).toLocaleString()}
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
        <CosmicMinistrySpirit name="Audit Spirit" />
        <CosmicMinistryThrone name="Audit Throne" />
        <CosmicMinistryThroneAscended name="Audit Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Audit — Eternal Throne" />

        {/* Divine */}
        <CosmicDivineBeing name="Audit — Divine Being" />
        <CosmicAstralDivination />

      </div>
    </CosmicPage>
  );
}
