export default function CosmicConstellation() {
  const nodes = [
    { name: "Ministry", x: 180, y: 40 },
    { name: "Compliance", x: 60, y: 160 },
    { name: "Mechanisation", x: 300, y: 160 },
    { name: "Risk", x: 120, y: 280 },
    { name: "Upliftment", x: 260, y: 280 },
  ];

  return (
    <div className="cosmic-constellation">
      {nodes.map((n, idx) => (
        <div
          key={idx}
          className="cosmic-node"
          style={{ left: n.x, top: n.y }}
        >
          {n.name}
        </div>
      ))}
    </div>
  );
}
