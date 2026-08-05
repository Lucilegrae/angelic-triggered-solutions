export default function CosmicInput({ label, ...props }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-slate-300">{label}</label>
      <input className="cosmic-input" {...props} />
    </div>
  );
}
