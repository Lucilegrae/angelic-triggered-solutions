export default function CosmicPage({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
