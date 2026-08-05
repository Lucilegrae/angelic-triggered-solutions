export default function CosmicHeatmap({ values = [] }) {
  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800">
      <p className="text-slate-300 mb-2">Cosmic Heatmap</p>
      <pre className="text-slate-500 text-xs">{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}
