"use client";


const tiers = [
  {
    name: "Core Engines",
    color: "text-emerald-400",
    engines: [
      { label: "Ascension Engine", path: "/intelligence/ascension-engine" },
      { label: "Destiny Codex", path: "/intelligence/destiny-codex" },
      { label: "Soul-Energy Intelligence", path: "/intelligence/soul-energy-intelligence" },
      { label: "Omniversal Integration", path: "/intelligence/omniversal-integration" },
      { label: "Harmonic Graph", path: "/intelligence/harmonic-graph" },
      { label: "Consciousness Map", path: "/intelligence/consciousness-map" },
      { label: "Singularity Protocol", path: "/intelligence/singularity-protocol" },
      { label: "Federation Layer", path: "/intelligence/federation-layer" },
    ],
  },
  {
    name: "Astral Engines",
    color: "text-pink-400",
    engines: [
      { label: "Astral Governance Fabric", path: "/intelligence/astral-governance-fabric" },
      { label: "Astral Pressure Monitor", path: "/intelligence/astral-pressure" },
      { label: "Omni-Sentience Engine", path: "/intelligence/omni-sentience" },
      { label: "Celestial Cartography", path: "/intelligence/celestial-cartography" },
      { label: "Harmonic Sequencer", path: "/intelligence/celestial-harmonic-sequencer" },
    ],
  },
  {
    name: "Quantum Engines",
    color: "text-sky-400",
    engines: [
      { label: "Quantum Kernel", path: "/intelligence/quantum-kernel" },
      { label: "Hyper-Convergence", path: "/intelligence/hyper-convergence" },
      { label: "Dimensional Stability", path: "/intelligence/dimensional-stability" },
      { label: "Probability Lattice", path: "/intelligence/temporal-probability-lattice" },
      { label: "Cosmic Risk Matrix", path: "/intelligence/cosmic-risk-matrix" },
    ],
  },
  {
    name: "Temporal Engines",
    color: "text-violet-400",
    engines: [
      { label: "Cosmic Timeline Engine", path: "/intelligence/cosmic-timeline" },
      { label: "Oracle Engine", path: "/intelligence/oracle-engine" },
      { label: "Continuum Engine", path: "/intelligence/continuum-engine" },
      { label: "Sovereign Command Matrix", path: "/intelligence/sovereign-command-matrix" },
    ],
  },
];

export default function TierNavigator() {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 h-screen p-4 overflow-y-auto">
      <h2 className="text-xl font-semibold text-slate-100 mb-4">
        ATS Infinity Tier Navigator
      </h2>

      {tiers.map((tier, i) => (
        <div key={i} className="mb-6">
          <h3 className={`text-sm font-bold ${tier.color} mb-2`}>
            {tier.name}
          </h3>

          <ul className="space-y-1">
            {tier.engines.map((engine, j) => (
              <li key={j}>
                <Link
                  href={engine.path}
                  className="text-slate-300 hover:text-slate-100 text-xs underline"
                >
                  {engine.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
