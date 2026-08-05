export default function CosmicGNSSOrbitalV2() {
  const points = [
    { x: 240, y: 20 },
    { x: 460, y: 240 },
    { x: 240, y: 460 },
    { x: 20, y: 240 },
  ];

  return (
    <div className="orbital-v2">
      {points.map((p, idx) => (
        <div
          key={idx}
          className="orbital-point"
          style={{ left: p.x, top: p.y }}
        />
      ))}
    </div>
  );
}
