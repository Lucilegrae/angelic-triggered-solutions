export default function CosmicFederationNodeGrid({ nodes }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded mb-6">
      <h3 className="text-lg font-semibold mb-4">Federation Node Metrics</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {nodes.map((n, i) => (
          <div
            key={i}
            className="bg-slate-800 p-4 rounded border border-slate-700"
          >
            <p className="text-slate-200 font-semibold mb-2">
              {n.node_label}
            </p>

            <p className="text-slate-400">
              Health: {n.federation_health}
            </p>
            <p className="text-slate-400">
              Trust: {n.trust_index}
            </p>
            <p className="text-slate-400">
              Sync: {n.sync_level}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
