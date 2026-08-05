export default function CosmicDivineContinuum() {
  const nodes = [
    { name: "Intelligence — Divine Mind", x: 360, y: 160 },
    { name: "Certificates — Sacred Relics", x: 120, y: 360 },
    { name: "Payments — Divine Aurora Currents", x: 600, y: 360 },
    { name: "Savings — Celestial Treasury", x: 360, y: 560 },
    { name: "Stakeholders — Divine Council", x: 180, y: 760 },
    { name: "Communities — Star Nations", x: 540, y: 760 },
    { name: "Institutions — Astral Thrones", x: 360, y: 960 },
    { name: "Staff — Eternal Guardians", x: 120, y: 960 },
  ];

  return (
    <div className="divine-continuum">
      {nodes.map((n, idx) => (
        <div
          key={idx}
          className="divine-node"
          style={{ left: n.x, top: n.y }}
        >
          {n.name}
        </div>
      ))}
    </div>
  );
}
