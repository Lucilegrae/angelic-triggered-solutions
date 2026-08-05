export default function CosmicHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-slate-100">{title}</h1>
      {subtitle && (
        <p className="text-slate-400 text-lg mt-2">{subtitle}</p>
      )}
    </div>
  );
}
