"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";

/* Cosmic Layout */
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicHeader from "@/components/cosmic/CosmicHeader";

/* Ledger Analytics Cosmic Components */
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

// Your existing BarChart component preserved exactly
function BarChart({ labels, values, color = "bg-yellow-500" }) {
  return (
    <div className="bg-slate-800 p-4 rounded">
      <ul className="space-y-2">
        {values.map((v, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-40 text-slate-300">{labels[i]}</span>
            <div className="flex-1 bg-slate-700 h-3 rounded">
              <div
                className={`${color} h-3 rounded`}
                style={{ width: `${v}%` }}
              ></div>
            </div>
            <span className="text-slate-400">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LedgerAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      const { data, error } = await supabase.rpc("ledger_analytics_dashboard");

      if (error) console.error("Ledger Analytics RPC error:", error);

      setAnalytics(data || null);
      setLoading(false);
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Ledger Analytics" />
        <div className="p-6 text-slate-200">Loading Ledger Analytics…</div>
      </CosmicPage>
    );
  }

  if (!analytics) {
    return (
      <CosmicPage className="cosmic-ledger">
        <CosmicHeader title="Ledger Analytics" />
        <div className="p-6 text-slate-200">No analytics available.</div>
      </CosmicPage>
    );
  }

  const typeLabels = analytics.type_distribution.map((t) => t.entry_type);
  const typeValues = analytics.type_distribution.map((t) => t.total_usd);

  const moduleLabels = analytics.module_distribution.map((m) => m.module_name);
  const moduleValues = analytics.module_distribution.map((m) => m.total_usd);

  const monthlyLabels = analytics.monthly_totals.map((m) => m.month);
  const monthlyValues = analytics.monthly_totals.map((m) => m.total_usd);

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Ledger Analytics" />

      {/* Ledger Analytics Summary */}
      <div className="p-6 text-slate-200">

        <h1 className="text-2xl font-bold mb-6">Ledger Analytics Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Total Transactions</h2>
            <p className="text-3xl mt-2">{analytics.total_entries}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Total Value</h2>
            <p className="text-3xl mt-2">{analytics.total_value_usd} USD</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Active Modules</h2>
            <p className="text-3xl mt-2">{analytics.active_modules}</p>
          </div>
        </div>

        {/* Type Distribution */}
        <h2 className="text-xl font-bold mb-2">Transaction Types</h2>
        <BarChart labels={typeLabels} values={typeValues} color="bg-green-500" />

        {/* Module Distribution */}
        <h2 className="text-xl font-bold mt-6 mb-2">Module Contribution</h2>
        <BarChart labels={moduleLabels} values={moduleValues} color="bg-blue-500" />

        {/* Monthly Totals */}
        <h2 className="text-xl font-bold mt-6 mb-2">Monthly Financial Trend</h2>
        <BarChart labels={monthlyLabels} values={monthlyValues} color="bg-purple-500" />

        {/* Back Link */}
        <a
          href="/portal/ledger"
          className="inline-block text-blue-400 hover:text-blue-300 mt-6"
        >
          Back to Ledger Registry →
        </a>
      </div>

      {/* Cosmic Ledger Analytics Layer */}
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
