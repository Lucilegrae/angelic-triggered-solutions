export default function CosmicEternalContinuum() {
  const nodes = [
    { name: "Intelligence — Celestial Mind", x: 360, y: 120 },
    { name: "Certificates — Eternal Scrolls", x: 120, y: 300 },
    { name: "Payments — Aurora Rivers", x: 600, y: 300 },
    { name: "Savings — Celestial Vault", x: 360, y: 480 },
    { name: "Stakeholders — Cosmic Council", x: 180, y: 660 },
    { name: "Communities — Star Clusters", x: 540, y: 660 },
    { name: "Institutions — Astral Pillars", x: 360, y: 840 },
    { name: "Staff — Eternal Guardians", x: 120, y: 840 },
  ];

  return (
    <div className="eternal-continuum">
      {nodes.map((n, idx) => (
        <div
          key={idx}
          className="eternal-node"
          style={{ left: n.x, top: n.y }}
        >
          {n.name}
        </div>
      ))}
    </div>
  );
}
