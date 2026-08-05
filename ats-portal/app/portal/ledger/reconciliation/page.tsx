"use client";

import { safe } from "@/lib/safe";
import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Cosmic Ledger Components */
import CosmicLedgerMap from "@/components/cosmic/CosmicLedgerMap";
import CosmicLedgerAnomalies from "@/components/cosmic/CosmicLedgerAnomalies";
import CosmicLedgerTreasury from "@/components/cosmic/CosmicLedgerTreasury";
import CosmicLedgerStress from "@/components/cosmic/CosmicLedgerStress";
import CosmicLedgerPredict from "@/components/cosmic/CosmicLedgerPredict";
import CosmicLedgerProjection from "@/components/cosmic/CosmicLedgerProjection";
import CosmicLedgerCorrelation from "@/components/cosmic/CosmicLedgerCorrelation";

/* GNSS / Astral */
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

/* Ministry / Divine */
import CosmicMinistrySpirit from "@/components/cosmic/CosmicMinistrySpirit";
import CosmicMinistryThrone from "@/components/cosmic/CosmicMinistryThrone";
import CosmicMinistryThroneAscended from "@/components/cosmic/CosmicMinistryThroneAscended";
import CosmicMinistryThroneEternal from "@/components/cosmic/CosmicMinistryThroneEternal";
import CosmicDivineBeing from "@/components/cosmic/CosmicDivineBeing";
import CosmicAstralDivination from "@/components/cosmic/CosmicAstralDivination";

/* Status Badge */
function StatusBadge({ status }) {
  const color =
    status === "ok"
      ? "bg-green-700"
      : status === "warning"
      ? "bg-yellow-700"
      : "bg-red-700";

  return (
    <span className={`${color} px-2 py-1 rounded text-slate-200 text-sm`}>
      {status.toUpperCase()}
    </span>
  );
}

export default function CosmicLedgerReconciliationUnified() {
  const [tab, setTab] = useState("report");

  const [report, setReport] = useState<any>(null);
  const [queue, setQueue] = useState<any[]>([]);
  const [loadingReport, setLoadingReport] = useState(true);
  const [loadingQueue, setLoadingQueue] = useState(true);
  const [resolvingId, setResolvingId] = useState<any>(null);

  /* Load Report */
  useEffect(() => {
    async function loadReport() {
      const { data, error } = await supabase.rpc("ledger_reconciliation_report");
      if (error) console.error("Report RPC error:", error);
      setReport(data || null);
      setLoadingReport(false);
    }
    loadReport();
  }, []);

  /* Load Queue */
  useEffect(() => {
    async function loadQueue() {
      const { data, error } = await supabase.rpc("ledger_reconciliation_queue");
      if (error) console.error("Queue RPC error:", error);
      setQueue(data || []);
      setLoadingQueue(false);
    }
    loadQueue();
  }, []);

  async function resolveItem(id) {
    setResolvingId(id);
    const { error } = await supabase.rpc("resolve_ledger_reconciliation", {
      reconciliation_id: id,
    });

    if (error) {
      console.error("Resolve RPC error:", error);
    } else {
      setQueue((prev) => safe(prev).filter((i) => i.id !== id));
    }

    setResolvingId(null);
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Unified Ledger Reconciliation Engine" />

      <div className="p-6 text-slate-200">

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab("report")}
            className={`px-4 py-2 rounded ${
              tab === "report" ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            Reconciliation Report
          </button>

          <button
            onClick={() => setTab("queue")}
            className={`px-4 py-2 rounded ${
              tab === "queue" ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            Reconciliation Queue
          </button>
        </div>

        {/* REPORT TAB */}
        {tab === "report" && (
          <div>
            {loadingReport ? (
              <p className="text-slate-400">Loading report…</p>
            ) : !report ? (
              <p className="text-slate-400">No reconciliation report available.</p>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-6">
                  Ledger Reconciliation Report
                </h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-900 p-4 rounded border border-slate-800">
                    <h2 className="text-lg font-semibold">Total Entries</h2>
                    <p className="text-3xl mt-2">{report.total_entries}</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded border border-slate-800">
                    <h2 className="text-lg font-semibold">Issues Found</h2>
                    <p className="text-3xl mt-2">{report.total_issues}</p>
                  </div>

                  <div className="bg-slate-900 p-4 rounded border border-slate-800">
                    <h2 className="text-lg font-semibold">Modules Checked</h2>
                    <p className="text-3xl mt-2">{report.modules_checked}</p>
                  </div>
                </div>

                {/* Module Status */}
                <h2 className="text-xl font-bold mb-2">Module Status</h2>
                <div className="bg-slate-900 p-4 rounded border border-slate-800 mb-6">
                  {report.module_status.map((m, idx) => (
                    <div key={idx} className="flex justify-between py-1 text-slate-300">
                      <span>{m.module_name}</span>
                      <StatusBadge status={m.status} />
                    </div>
                  ))}
                </div>

                {/* Issues */}
                <h2 className="text-xl font-bold mb-2">Issues</h2>
                <div className="space-y-4">
                  {report.issues.length === 0 && (
                    <p className="text-slate-400">No issues found.</p>
                  )}

                  {report.issues.map((i, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-900 border border-slate-800 p-4 rounded"
                    >
                      <h3 className="text-lg font-semibold">{i.issue_type}</h3>
                      <p className="text-slate-400 mt-1">{i.description}</p>

                      {i.related_id && (
                        <a
                          href={`/portal/ledger/${i.related_id}`}
                          className="text-blue-400 hover:text-blue-300 mt-2 inline-block"
                        >
                          View Related Ledger Entry →
                        </a>
                      )}

                      {i.module && (
                        <p className="text-slate-500 mt-1">Module: {i.module}</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* QUEUE TAB */}
        {tab === "queue" && (
          <div>
            {loadingQueue ? (
              <p className="text-slate-400">Loading queue…</p>
            ) : queue.length === 0 ? (
              <p className="text-slate-400">No reconciliation items pending.</p>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">Reconciliation Queue</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {queue.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-900 border border-slate-800 p-4 rounded"
                    >
                      <h2 className="text-xl font-semibold">
                        {item.entry_type} — {item.uuid}
                      </h2>

                      <p className="text-slate-400 mt-2">
                        Amount: {item.amount_usd} {item.currency}
                      </p>
                      <p className="text-slate-400">
                        Source: {item.source_module} / {item.source_reference}
                      </p>
                      <p className="text-slate-400 mt-2">
                        Status: {item.status} (reason: {item.reason})
                      </p>

                      <p className="text-slate-500 mt-2">
                        Created: {new Date(item.created_at).toLocaleString()}
                      </p>

                      <button
                        className="mt-4 bg-green-600 px-3 py-1 rounded hover:bg-green-500 disabled:opacity-50"
                        onClick={() => resolveItem(item.id)}
                        disabled={resolvingId === item.id}
                      >
                        {resolvingId === item.id ? "Resolving…" : "Mark Resolved"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <a
          href="/portal/ledger"
          className="inline-block text-blue-400 hover:text-blue-300 mt-6"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Layer */}
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

        <CosmicMinistrySpirit name="Reconciliation Spirit" />
        <CosmicMinistryThrone name="Reconciliation Throne" />
        <CosmicMinistryThroneAscended name="Reconciliation Throne — Ascended" />
        <CosmicMinistryThroneEternal name="Reconciliation — Eternal Throne" />

        <CosmicDivineBeing name="Reconciliation — Divine Being" />
        <CosmicAstralDivination />
      </div>
    </CosmicPage>
  );
}
