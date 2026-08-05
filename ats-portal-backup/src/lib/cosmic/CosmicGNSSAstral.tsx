export default function CosmicGNSSAstral() {
  const stars = [
    { x: 260, y: 40 },
    { x: 480, y: 260 },
    { x: 260, y: 480 },
    { x: 40, y: 260 },
  ];

  return (
    <div className="astral-navigation">
      {stars.map((s, idx) => (
        <div
          key={idx}
          className="astral-star"
          style={{ left: s.x, top: s.y }}
        />
      ))}
    </div>
  );
}
