"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import ATSMobileMenu from "./ATSMobileMenu";
import {
  Home,
  Users,
  Building,
  Wallet,
  CreditCard,
  FileBadge,
  Map,
  Brain,
  Shield,
} from "lucide-react";

export default function ATSNavigationRibbonIcons() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = [
    { name: "Dashboard", href: "/portal", icon: Home },
    { name: "Members", href: "/portal/members", icon: Users },
    { name: "Stakeholders", href: "/portal/stakeholders", icon: Shield },
    { name: "Savings", href: "/portal/savings", icon: Wallet },
    { name: "Payments", href: "/portal/payments", icon: CreditCard },
    { name: "Certificates", href: "/portal/certificates", icon: FileBadge },
    { name: "Institutions", href: "/portal/institutions", icon: Building },
    { name: "Communities", href: "/portal/communities", icon: Map },
    { name: "Intelligence", href: "/portal/intelligence/dashboard", icon: Brain },
    { name: "Staff", href: "/portal/staff", icon: Shield },
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
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm ${
                  active
                    ? "text-blue-400 font-semibold"
                    : "text-slate-300 hover:text-blue-300"
                }`}
              >
                <Icon size={16} />
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
