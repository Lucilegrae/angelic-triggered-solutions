export default function CosmicFederationTimeline({ events }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded mb-6">
      <h3 className="text-lg font-semibold mb-4">Federation Timeline</h3>

      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="border-l border-slate-700 pl-4">
            <p className="text-slate-300 font-semibold">{e.title}</p>
            <p className="text-slate-400 text-sm">{e.date}</p>
            <p className="text-slate-500 mt-1">{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
