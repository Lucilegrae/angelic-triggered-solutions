"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Workflow", path: "/portal/workflow", icon: "⚡" },
  { name: "Ministry", path: "/portal/ministry", icon: "🏛" },
  { name: "Procurement", path: "/portal/procurement", icon: "🌾" },
  { name: "Cosmic", path: "/portal/cosmic", icon: "🌌" },
  { name: "Member", path: "/portal/member", icon: "👥" },
  { name: "Compliance", path: "/portal/compliance", icon: "🛡" },
  { name: "Payments", path: "/portal/payment", icon: "💳" },
  { name: "Federation", path: "/portal/federation", icon: "🌐" },
  { name: "Glyphs", path: "/portal/glyph", icon: "📜" },
];

export default function AtsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="ats-sidebar">
      <div className="ats-sidebar-title">ATS Infinity</div>

      <nav className="ats-sidebar-nav">
        {links.map((link) => {
          const active = pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`ats-sidebar-link ${active ? "active" : ""}`}
            >
              <span className="icon">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
