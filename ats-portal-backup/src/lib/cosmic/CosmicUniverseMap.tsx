export default function CosmicUniverseMap() {
  const nodes = [
    { name: "Intelligence", x: 260, y: 40 },
    { name: "Certificates", x: 80, y: 160 },
    { name: "Payments", x: 440, y: 160 },
    { name: "Savings", x: 260, y: 260 },
    { name: "Stakeholders", x: 120, y: 360 },
    { name: "Communities", x: 400, y: 360 },
    { name: "Institutions", x: 260, y: 480 },
    { name: "Staff", x: 80, y: 480 },
  ];

  return (
    <div className="universe-map">
      {nodes.map((n, idx) => (
        <div
          key={idx}
          className="universe-node"
          style={{ left: n.x, top: n.y }}
        >
          {n.name}
        </div>
      ))}
    </div>
  );
}
