"use client";


export default function MinistryLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="flex gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800">

        <a href="/ministry">
          <div className="px-3 py-2 hover:bg-slate-800/40 rounded">
            Ministry Home
          </div>
        </a>

        <a href="/ministry/housing/dashboard">
          <div className="px-3 py-2 hover:bg-slate-800/40 rounded">
            Housing Dashboard
          </div>
        </a>

        <a href="/ministry/occupancy-pressure">
          <div className="px-3 py-2 hover:bg-slate-800/40 rounded">
            Occupancy Pressure
          </div>
        </a>

        <a href="/ministry/risk-clusters">
          <div className="px-3 py-2 hover:bg-slate-800/40 rounded">
            Risk Clusters
          </div>
        </a>

      </nav>

      <main>{children}</main>
    </div>
  );
}
