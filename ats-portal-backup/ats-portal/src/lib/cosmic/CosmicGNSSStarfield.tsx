export default function CosmicGNSSStarfield({ points }) {
  return (
    <div className="gnss-starfield">
      {points.map((p, idx) => (
        <div
          key={idx}
          className="star"
          style={{ left: p.x, top: p.y }}
        />
      ))}
    </div>
  );
}
