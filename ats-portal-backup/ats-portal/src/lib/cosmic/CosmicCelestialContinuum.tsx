export default function CosmicCelestialContinuum() {
  const nodes = [
    { name: "Intelligence", x: 360, y: 80 },
    { name: "Certificates", x: 120, y: 220 },
    { name: "Payments", x: 600, y: 220 },
    { name: "Savings", x: 360, y: 360 },
    { name: "Stakeholders", x: 180, y: 520 },
    { name: "Communities", x: 540, y: 520 },
    { name: "Institutions", x: 360, y: 680 },
    { name: "Staff", x: 120, y: 680 },
  ];

  return (
    <div className="celestial-continuum">
      {nodes.map((n, idx) => (
        <div
          key={idx}
          className="celestial-node"
          style={{ left: n.x, top: n.y }}
        >
          {n.name}
        </div>
      ))}
    </div>
  );
}
