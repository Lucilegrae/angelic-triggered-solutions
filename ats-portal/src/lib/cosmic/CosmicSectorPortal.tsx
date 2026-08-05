
export default function CosmicSectorPortal({ name, href }) {
  return (
    <a href={href}>
      <div className="cosmic-sector-portal">
        <div className="text-2xl font-bold mb-2">{name}</div>
        <div className="text-slate-300">Enter Sector</div>
      </div>
    </a>
  );
}
