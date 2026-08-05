"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import ATSMobileMenu from "./ATSMobileMenu";

export default function ATSNavigationRibbon() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = [
    { name: "Dashboard", href: "/portal" },
    { name: "Members", href: "/portal/members" },
    { name: "Stakeholders", href: "/portal/stakeholders" },
    { name: "Savings", href: "/portal/savings" },
    { name: "Payments", href: "/portal/payments" },
    { name: "Certificates", href: "/portal/certificates" },
    { name: "Institutions", href: "/portal/institutions" },
    { name: "Communities", href: "/portal/communities" },
    { name: "Intelligence", href: "/portal/intelligence/dashboard" },
    { name: "Staff", href: "/portal/staff" },
  ];

  return (
    <>
      <div className="w-full bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="text-blue-400 font-bold text-xl tracking-wide">
          ATS Portal
        </div>

        <nav className="hidden md:flex gap-6">
          {nav.map((item) => {
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
              </a>
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
