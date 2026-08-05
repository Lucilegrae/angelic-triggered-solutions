export default function CosmicHeatmap({ values }) {
  const modules = ["Alignment", "Compliance", "Mechanisation", "Risk", "Upliftment"];

  return (
    <div className="cosmic-heatmap">
      {modules.map((m, idx) => {
        const v = values[idx];
        const color = `rgba(${255 - v * 2}, ${v * 2}, 120, 0.7)`;

        return (
          <div key={idx} className="heat-cell" style={{ background: color }}>
            {m}: {v}%
          </div>
        );
      })}
    </div>
  );
}
