export default function CosmicGNSSOrbital() {
  const points = [
    { x: 200, y: 20 },
    { x: 380, y: 200 },
    { x: 200, y: 380 },
    { x: 20, y: 200 },
  ];

  return (
    <div className="gnss-orbit">
      {points.map((p, idx) => (
        <div
          key={idx}
          className="gnss-orbit-point"
          style={{ left: p.x, top: p.y }}
        />
      ))}
    </div>
  );
}
