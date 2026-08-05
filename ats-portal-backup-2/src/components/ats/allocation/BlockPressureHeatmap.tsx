"use client";

export default function BlockPressureHeatmap({ pressure }: { pressure: any[] }) {
  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🔥 Block Pressure Heatmap</h3>
      <p className="aura-text">Real-time block saturation levels.</p>

      <div className="heatmap-grid">
        {pressure.map((p) => (
          <div key={p.block} className={`heatmap-card heatmap-${p.band.toLowerCase()}`}>
            <div className="heatmap-block">{p.block}</div>
            <div className="heatmap-pressure">{p.pressure}%</div>
            <div className="heatmap-band">{p.band}</div>
            <div className="heatmap-remaining">
              Remaining: {p.remaining_units} / {p.max_units}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
