"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MinistrySidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-md text-sm ${
      pathname === path
        ? "bg-emerald-600/20 text-emerald-300 font-semibold animate-aura"
        : "text-slate-300 hover:bg-slate-800/40"
    }`;

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/40 p-4 space-y-4">
      <h2 className="text-lg font-semibold tracking-wide mb-2">
        Ministry Console
      </h2>

      <nav className="space-y-2">
        <Link href="/ministry" className={linkClass("/ministry")}>
          Dashboard Overview
        </Link>

        <Link href="/ministry/coverage" className={linkClass("/ministry/coverage")}>
          Coverage Snapshot
        </Link>

        <Link href="/ministry/tier-load" className={linkClass("/ministry/tier-load")}>
          Tier Load Analytics
        </Link>

        <Link href="/ministry/estate" className={linkClass("/ministry/estate")}>
          Estate Pressure
        </Link>

        <Link href="/ministry/risk" className={linkClass("/ministry/risk")}>
          Compliance & Risk
        </Link>

        <Link href="/ministry/lifecycle" className={linkClass("/ministry/lifecycle")}>
          Allocation Lifecycle
        </Link>
      </nav>
    </aside>
  );
}
