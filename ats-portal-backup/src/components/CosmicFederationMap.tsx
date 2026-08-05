export default function CosmicFederationMap({ nodes }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded mb-6">
      <h3 className="text-lg font-semibold mb-4">Federation Topology Map</h3>

      <svg width="100%" height="400">
        {nodes.map((n, i) => {
          const color =
            n.federation_health > 80
              ? "#22c55e"
              : n.trust_index > 80
              ? "#6366f1"
              : n.sync_level > 80
              ? "#ec4899"
              : "#64748b";

          return (
            <g key={i}>
              <circle
                cx={n.x_pos}
                cy={n.y_pos}
                r="14"
                fill={color}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <text
                x={n.x_pos + 18}
                y={n.y_pos + 4}
                fill="#ffffff"
                fontSize="12"
              >
                {n.node_label}
              </text>
            </g>
          );
        })}

        {nodes.map((n, i) =>
          nodes.map((m, j) => {
            if (i === j) return null;
            if (n.link_to === m.node_label) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={n.x_pos}
                  y1={n.y_pos}
                  x2={m.x_pos}
                  y2={m.y_pos}
                  stroke="rgba(148,163,184,0.6)"
                  strokeWidth="1"
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
}
