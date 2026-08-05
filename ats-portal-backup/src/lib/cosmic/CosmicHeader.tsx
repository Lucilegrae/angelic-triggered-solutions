export default function CosmicHeader({ title, className }) {
  return (
    <div className={`text-3xl font-bold mb-6 p-4 rounded-lg ${className}`}>
      <span className="drop-shadow-[0_0_12px_rgba(0,120,255,0.7)]">
        {title}
      </span>
    </div>
  );
}
