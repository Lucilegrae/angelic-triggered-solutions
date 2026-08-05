"use client";

import { useState } from "react";
import Link from "next/link";

const registry = [
  {
    tier: "Core",
    color: "text-emerald-400",
    engines: [
      { label: "Ascension Engine", path: "/intelligence/ascension-engine" },
      { label: "Destiny Codex", path: "/intelligence/destiny-codex" },
      { label: "Soul-Energy Intelligence", path: "/intelligence/soul-energy-intelligence" },
      { label: "Omniversal Integration Engine", path: "/intelligence/omniversal-integration" },
      { label: "Harmonic Graph", path: "/intelligence/harmonic-graph" },
      { label: "Consciousness Map", path: "/intelligence/consciousness-map" },
      { label: "Singularity Protocol", path: "/intelligence/singularity-protocol" },
      { label: "Federation Layer", path: "/intelligence/federation-layer" },
    ],
  },
  {
    tier: "Astral",
    color: "text-pink-400",
    engines: [
      { label: "Astral Governance Fabric", path: "/intelligence/astral-governance-fabric" },
      { label: "Astral Pressure Monitor", path: "/intelligence/astral-pressure" },
      { label: "Omni-Sentience Engine", path: "/intelligence/omni-sentience" },
      { label: "Celestial Cartography System", path: "/intelligence/celestial-cartography" },
      { label: "Celestial Harmonic Sequencer", path: "/intelligence/celestial-harmonic-sequencer" },
    ],
  },
  {
    tier: "Quantum",
    color: "text-sky-400",
    engines: [
      { label: "Quantum Governance Kernel", path: "/intelligence/quantum-kernel" },
      { label: "Hyper-Convergence Engine", path: "/intelligence/hyper-convergence" },
      { label: "Dimensional Stability Engine", path: "/intelligence/dimensional-stability" },
      { label: "Temporal Probability Lattice", path: "/intelligence/temporal-probability-lattice" },
      { label: "Cosmic Risk Matrix", path: "/intelligence/cosmic-risk-matrix" },
    ],
  },
  {
    tier: "Temporal",
    color: "text-violet-400",
    engines: [
      { label: "Cosmic Timeline Engine", path: "/intelligence/cosmic-timeline" },
      { label: "Oracle Engine", path: "/intelligence/oracle-engine" },
      { label: "Continuum Engine", path: "/intelligence/continuum-engine" },
      { label: "Sovereign Command Matrix", path: "/intelligence/sovereign-command-matrix" },
    ],
  },
];

export default function EngineRegistry() {
  const [query, setQuery] = useState("");

  const filtered = registry.map((tier) => ({
    ...tier,
    engines: tier.engines.filter((e) =>
      e.label.toLowerCase().includes(query.toLowerCase())
    ),
  }));

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Engine Registry ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        Unified index of all ATS Infinity engines across Core, Astral, Quantum, and Temporal tiers.
      </p>

      <input
        type="text"
        placeholder="Search engines..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6 p-2 rounded bg-slate-800 text-slate-200 border border-slate-700"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((tier, i) => (
          <div key={i} className="pdf-card p-4 border border-slate-700 rounded-lg">
            <h3 className={`text-lg font-semibold mb-2 ${tier.color}`}>
              {tier.tier} Tier
            </h3>

            <ul className="space-y-1 text-xs">
              {tier.engines.length === 0 && (
                <li className="text-slate-500">No matches</li>
              )}

              {tier.engines.map((engine, j) => (
                <li key={j} className="flex justify-between">
                  <span className="text-slate-200">{engine.label}</span>
                  <Link
                    href={engine.path}
                    className="text-emerald-400 hover:text-emerald-300 underline"
                  >
                    Open
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
