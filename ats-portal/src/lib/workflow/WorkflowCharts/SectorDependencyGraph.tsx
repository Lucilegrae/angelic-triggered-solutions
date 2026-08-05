"use client";

import ForceGraph2D from "react-force-graph-2d";

export function SectorDependencyGraph({ data }: { data: any[] }) {
  const sectors = Array.from(
    new Set([
      ...data.map((d) => d.from_sector),
      ...data.map((d) => d.to_sector),
    ])
  );

  const nodes = sectors.map((s) => ({
    id: s,
    name: s,
  }));

  const links = data.map((d) => ({
    source: d.from_sector,
    target: d.to_sector,
    value: d.count,
  }));

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-indigo-500/40">
      <div className="text-indigo-300 font-bold text-xl mb-4">
        Sector Dependency Graph
      </div>

      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeLabel="name"
        nodeAutoColorBy="id"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={(d) => d.value * 0.001}
        width={900}
        height={600}
      />
    </div>
  );
}
