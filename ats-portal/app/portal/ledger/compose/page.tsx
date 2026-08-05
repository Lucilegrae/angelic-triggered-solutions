"use client";

import { useState } from "react";
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

export default function LedgerCompose() {
  const [form, setForm] = useState({
    entry_type: "",
    amount_usd: "",
    currency: "USD",
    description: "",
    miner_id: null,
    site_id: null,
    coordinator_id: null,
    certificate_id: null,
    claim_id: null,
    environment_id: null,
    safety_id: null,
    gnss_id: null,
  });

  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function submit() {
    setSaving(true);

    const { data, error } = await supabase.rpc("create_ledger_entry", {
      payload: form,
    });

    if (error) {
      console.error("Ledger Compose RPC error:", error);
      setResult({ error: true, message: error.message });
    } else {
      setResult({ error: false, message: "Ledger entry created!", id: data.id });
    }

    setSaving(false);
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <CosmicPage className="cosmic-ledger">
      <CosmicHeader title="Ledger Transaction Composer" />

      {/* Composer Form */}
      <div className="p-6 text-slate-200 max-w-3xl">

        <h1 className="text-2xl font-bold mb-6">Create Ledger Entry</h1>

        {/* Entry Type */}
        <div className="mb-4">
          <label className="block mb-1 text-slate-300">Entry Type</label>
          <input
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            value={form.entry_type}
            onChange={(e) => updateField("entry_type", e.target.value)}
            placeholder="payout, claim, certificate_fee, gnss_fee, etc."
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block mb-1 text-slate-300">Amount (USD)</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            value={form.amount_usd}
            onChange={(e) => updateField("amount_usd", e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 text-slate-300">Description</label>
          <textarea
            className="w-full p-2 rounded bg-slate-800 border border-slate-700"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Describe the transaction"
          />
        </div>

        {/* Linked IDs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {[
            "miner_id",
            "site_id",
            "coordinator_id",
            "certificate_id",
            "claim_id",
            "environment_id",
            "safety_id",
            "gnss_id",
          ].map((field) => (
            <div key={field}>
              <label className="block mb-1 text-slate-300">{field}</label>
              <input
                type="number"
                className="w-full p-2 rounded bg-slate-800 border border-slate-700"
                value={form[field] || ""}
                onChange={(e) => updateField(field, Number(e.target.value))}
                placeholder="Optional"
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={saving}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
        >
          {saving ? "Saving…" : "Create Ledger Entry"}
        </button>

        {/* Result */}
        {result && (
          <div
            className={`mt-4 p-3 rounded ${
              result.error ? "bg-red-800" : "bg-green-800"
            }`}
          >
            <p>{result.message}</p>
            {!result.error && (
              <a
                href={`/portal/ledger/${result.id}`}
                className="text-blue-300 underline"
              >
                View Ledger Entry →
              </a>
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
