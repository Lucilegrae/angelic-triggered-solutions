"use client";

const tiers = [
  {
    name: "Tier I — Core Engines",
    description: "Foundational governance intelligence and base reality fields.",
    color: "border-emerald-500",
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
    name: "Tier II — Astral Engines",
    description: "Astral influence, pressure fields, and governance fabric.",
    color: "border-pink-500",
    engines: [
      { label: "Astral Governance Fabric", path: "/intelligence/astral-governance-fabric" },
      { label: "Astral Pressure Monitor", path: "/intelligence/astral-pressure" },
      { label: "Omni-Sentience Engine", path: "/intelligence/omni-sentience" },
      { label: "Celestial Cartography System", path: "/intelligence/celestial-cartography" },
      { label: "Celestial Harmonic Sequencer", path: "/intelligence/celestial-harmonic-sequencer" },
    ],
  },
  {
    name: "Tier III — Quantum Engines",
    description: "Quantum state, convergence, stability, and risk.",
    color: "border-sky-500",
    engines: [
      { label: "Quantum Governance Kernel", path: "/intelligence/quantum-kernel" },
      { label: "Hyper-Convergence Engine", path: "/intelligence/hyper-convergence" },
      { label: "Dimensional Stability Engine", path: "/intelligence/dimensional-stability" },
      { label: "Temporal Probability Lattice", path: "/intelligence/temporal-probability-lattice" },
      { label: "Cosmic Risk Matrix", path: "/intelligence/cosmic-risk-matrix" },
    ],
  },
  {
    name: "Tier IV — Temporal Engines",
    description: "Timelines, foresight, continuum, and master control.",
    color: "border-violet-500",
    engines: [
      { label: "Cosmic Timeline Engine", path: "/intelligence/cosmic-timeline" },
      { label: "Oracle Engine", path: "/intelligence/oracle-engine" },
      { label: "Continuum Engine", path: "/intelligence/continuum-engine" },
      { label: "Sovereign Command Matrix", path: "/intelligence/sovereign-command-matrix" },
    ],
  },
];

export default function MasterAtlas() {
  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Master Atlas ✦</h2>

      <p className="text-slate-400 text-sm mb-6">
        Unified cosmic governance atlas across Core, Astral, Quantum, and Temporal tiers.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className={`pdf-card border ${tier.color} p-4 rounded-lg`}
          >
            <h3 className="text-lg font-semibold text-slate-100 mb-1">
              {tier.name}
            </h3>
            <p className="text-slate-400 text-xs mb-3">
              {tier.description}
            </p>

            <ul className="space-y-1 text-xs">
              {tier.engines.map((engine, j) => (
                <li key={j} className="flex justify-between items-center">
                  <span className="text-slate-200">{engine.label}</span>
                  <a
                    href={engine.path}
                    className="text-emerald-400 hover:text-emerald-300 underline"
                  >
                    Open
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
