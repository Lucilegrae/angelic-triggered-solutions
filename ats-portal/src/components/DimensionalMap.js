"use client";

export default function DimensionalMap() {
  const width = 900;
  const height = 500;

  const nodes = [
    { label: "Core Realm", x: 150, y: 250, color: "#22c55e" },
    { label: "Astral Realm", x: 350, y: 150, color: "#ec4899" },
    { label: "Quantum Realm", x: 550, y: 250, color: "#0ea5e9" },
    { label: "Temporal Realm", x: 750, y: 150, color: "#a855f7" },
  ];

  const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 2],
    [1, 3],
  ];

  return (
    <div className="pdf-dashboard">
      <h2 className="slogan-arc aura-heading">✦ ATS Infinity Dimensional Map ✦</h2>

      <p className="text-slate-400 text-sm mb-4">
        SVG cosmic map of Core, Astral, Quantum, and Temporal realms.
      </p>

      <div className="pdf-card">
        <svg width={width} height={height} className="w-full">
          {links.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="rgba(148,163,184,0.6)"
              strokeWidth="1.5"
            />
          ))}

          {nodes.map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x}
                cy={n.y}
                r="12"
                fill={n.color}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <text
                x={n.x}
                y={n.y - 18}
                fill="#ffffff"
                fontSize="12"
                textAnchor="middle"
              >
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
