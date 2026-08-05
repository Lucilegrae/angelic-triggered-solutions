export default function CosmicOrbitSimulation() {
  const nodes = [
    { name: "Compliance", x: 40, y: 200 },
    { name: "Mechanisation", x: 200, y: 40 },
    { name: "Risk", x: 360, y: 200 },
    { name: "Upliftment", x: 200, y: 360 },
    { name: "Certificates", x: 80, y: 80 },
  ];

  return (
    <div className="orbit-container">
      <div className="orbit-core"></div>
      <div className="orbit-ring">
        {nodes.map((n, idx) => (
          <div
            key={idx}
            className="orbit-node"
            style={{ left: n.x, top: n.y }}
          >
            {n.name}
          </div>
        ))}
      </div>
    </div>
  );
}
