"use client";

import Link from "next/link";

const tiers = [
  {
    name: "Core",
    color: "text-emerald-400",
    metrics: {
      engines: 8,
      stability: 87,
      coherence: 90,
      resonance: 84,
    },
    path: "/intelligence/master-atlas",
  },
  {
    name: "Astral",
    color: "text-pink-400",
    metrics: {
      engines: 5,
      stability: 82,
      coherence: 88,
      resonance: 91,
    },
    path: "/intelligence/astral-governance-fabric",
  },
  {
    name: "Quantum",
    color: "text-sky-400",
    metrics: {
      engines: 5,
      stability: 89,
      coherence: 93,
      resonance: 78,
    },
    path: "/intelligence/quantum-kernel",
  },
  {
    name: "Temporal",
    color: "text-violet-400",
    metrics: {
      engines: 4,
      stability: 92,
      coherence: 95,
      resonance: 88,
    },
    path: "/intelligence/cosmic-timeline",
  },
];

export default function CosmicDashboard() {
  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Cosmic Dashboard ✦</h2>

      <p className="text-slate-400 text-sm mb-6">
        Real-time cosmic governance metrics across all ATS Infinity tiers.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {tiers.map((tier, i) => (
          <div key={i} className="pdf-card p-4 border border-slate-700 rounded-lg">
            <h3 className={`text-lg font-semibold mb-2 ${tier.color}`}>
              {tier.name} Tier
            </h3>

            <ul className="text-xs text-slate-300 space-y-1 mb-4">
              <li>Engines: {tier.metrics.engines}</li>
              <li>Stability Index: {tier.metrics.stability}%</li>
              <li>Coherence Index: {tier.metrics.coherence}%</li>
              <li>Resonance Field: {tier.metrics.resonance}%</li>
            </ul>

            <Link
              href={tier.path}
              className="text-emerald-400 hover:text-emerald-300 underline text-xs"
            >
              Open Tier
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
