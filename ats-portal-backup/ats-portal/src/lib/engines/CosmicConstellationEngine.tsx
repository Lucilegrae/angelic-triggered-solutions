export default function CosmicConstellationEngine() {
  const nodes = [
    { name: "Ministry", x: 200, y: 40 },
    { name: "Compliance", x: 60, y: 160 },
    { name: "Mechanisation", x: 320, y: 160 },
    { name: "Risk", x: 120, y: 300 },
    { name: "Upliftment", x: 260, y: 300 },
    { name: "Certificates", x: 200, y: 200 },
  ];

  return (
    <div className="cosmic-constellation-engine">
      {nodes.map((n, idx) => (
        <div
          key={idx}
          className="constellation-node"
          style={{ left: n.x, top: n.y }}
        >
          {n.name}
        </div>
      ))}
    </div>
  );
}
