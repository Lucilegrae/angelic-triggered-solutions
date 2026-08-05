export default function CosmicSingularity() {
  const nodes = [
    { name: "Intelligence", x: 300, y: 40 },
    { name: "Certificates", x: 80, y: 180 },
    { name: "Payments", x: 520, y: 180 },
    { name: "Savings", x: 300, y: 300 },
    { name: "Stakeholders", x: 140, y: 420 },
    { name: "Communities", x: 460, y: 420 },
    { name: "Institutions", x: 300, y: 560 },
    { name: "Staff", x: 80, y: 560 },
  ];

  return (
    <div className="singularity-field">
      <div className="singularity-core"></div>

      {nodes.map((n, idx) => (
        <div
          key={idx}
          className="singularity-node"
          style={{ left: n.x, top: n.y }}
        >
          {n.name}
        </div>
      ))}
    </div>
  );
}
