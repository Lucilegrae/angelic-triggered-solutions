export default function CosmicGNSSConstellation() {
  const points = [
    { x: 80, y: 120 },
    { x: 200, y: 200 },
    { x: 300, y: 140 },
    { x: 150, y: 300 },
  ];

  const satellites = [
    { name: "SAT‑01", x: 40, y: 40 },
    { name: "SAT‑02", x: 320, y: 60 },
  ];

  return (
    <div className="gnss-constellation">
      {points.map((p, idx) => (
        <div key={idx} className="gnss-point" style={{ left: p.x, top: p.y }} />
      ))}

      {satellites.map((s, idx) => (
        <div key={idx} className="gnss-satellite" style={{ left: s.x, top: s.y }}>
          {s.name}
        </div>
      ))}
    </div>
  );
}
