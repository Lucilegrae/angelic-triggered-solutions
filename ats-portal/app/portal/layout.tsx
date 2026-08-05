"use client";


export default function PortalLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="flex gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800">
        <a href="/portal">
          <div className="px-3 py-2 hover:bg-slate-800/40 rounded">
            Main Portal
          </div>
        </a>

        <a href="/portal/housing">
          <div className="px-3 py-2 hover:bg-slate-800/40 rounded">
            Housing Registration
          </div>
        </a>

        <a href="/ministry/housing/dashboard">
          <div className="px-3 py-2 hover:bg-slate-800/40 rounded">
            Ministry Housing Dashboard
          </div>
        </a>
      </nav>

      <main>{children}</main>
    </div>
  );
}
