export default function CosmicAstralDivination() {
  const stars = [
    { x: 300, y: 40 },
    { x: 560, y: 300 },
    { x: 300, y: 560 },
    { x: 40, y: 300 },
  ];

  return (
    <div className="astral-divination">
      {stars.map((s, idx) => (
        <div
          key={idx}
          className="divination-star"
          style={{ left: s.x, top: s.y }}
        />
      ))}
    </div>
  );
}
