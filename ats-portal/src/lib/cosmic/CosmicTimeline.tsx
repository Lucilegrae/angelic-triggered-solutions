export default function CosmicTimeline({ events }) {
  return (
    <div className="cosmic-timeline">
      {events.map((e, idx) => (
        <div key={idx} className="cosmic-timeline-item">
          <div className="text-blue-300 font-semibold">{e.title}</div>
          <div className="text-slate-400 text-sm">{e.time}</div>
          <div className="text-slate-300 mt-1">{e.description}</div>
        </div>
      ))}
    </div>
  );
}
