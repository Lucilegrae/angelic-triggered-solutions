"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ATSMobileMenu from "./ATSMobileMenu";

export default function ATSNavigationRibbonRoleAware() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function loadRole() {
      const res = await fetch("/api/staff/me");
      const data = await res.json();
      setRole(data.role);
    }
    loadRole();
  }, []);

  const nav = [
    { name: "Dashboard", href: "/portal", roles: ["admin", "officer", "clerk"] },
    { name: "Members", href: "/portal/members", roles: ["admin", "officer", "clerk"] },
    { name: "Stakeholders", href: "/portal/stakeholders", roles: ["admin", "officer"] },
    { name: "Savings", href: "/portal/savings", roles: ["admin", "officer"] },
    { name: "Payments", href: "/portal/payments", roles: ["admin", "officer"] },
    { name: "Certificates", href: "/portal/certificates", roles: ["admin"] },
    { name: "Institutions", href: "/portal/institutions", roles: ["admin"] },
    { name: "Communities", href: "/portal/communities", roles: ["admin"] },
    { name: "Intelligence", href: "/portal/intelligence/dashboard", roles: ["admin", "officer"] },
    { name: "Staff", href: "/portal/staff", roles: ["admin"] },
  ];

  return (
    <>
      <div className="w-full bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="text-blue-400 font-bold text-xl tracking-wide">
          ATS Portal
        </div>

        <nav className="hidden md:flex gap-6">
          {nav
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm ${
                    active
                      ? "text-blue-400 font-semibold"
                      : "text-slate-300 hover:text-blue-300"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
        </nav>

        <button
          className="md:hidden text-slate-300 text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      <ATSMobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
