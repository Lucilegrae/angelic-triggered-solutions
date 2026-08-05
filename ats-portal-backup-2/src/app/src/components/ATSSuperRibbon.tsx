"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ATSMobileMenu from "./ATSMobileMenu";
import {
  Home,
  Users,
  Shield,
  Wallet,
  CreditCard,
  FileBadge,
  Building,
  Map,
  Brain,
} from "lucide-react";

export default function ATSSuperRibbon() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(null);
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
    { name: "Dashboard", href: "/portal", icon: Home, roles: ["admin","officer","clerk"] },
    { name: "Members", href: "/portal/members", icon: Users, roles: ["admin","officer","clerk"] },
    { name: "Stakeholders", href: "/portal/stakeholders", icon: Shield, roles: ["admin","officer"] },
    { name: "Savings", href: "/portal/savings", icon: Wallet, roles: ["admin","officer"] },
    { name: "Payments", href: "/portal/payments", icon: CreditCard, roles: ["admin","officer"] },
    { name: "Certificates", href: "/portal/certificates", icon: FileBadge, roles: ["admin"] },
    { name: "Institutions", href: "/portal/institutions", icon: Building, roles: ["admin"] },
    { name: "Communities", href: "/portal/communities", icon: Map, roles: ["admin"] },
    { name: "Intelligence", href: "/portal/intelligence/dashboard", icon: Brain, roles: ["admin","officer"] },
    { name: "Staff", href: "/portal/staff", icon: Shield, roles: ["admin"] },
  ];

  const toggleMega = (key) => {
    setMega(mega === key ? null : key);
  };

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, idx, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + arr.slice(0, idx + 1).join("/"),
    }));

  return (
    <>
      <div className="w-full bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-lg shadow-blue-900/20 backdrop-blur-sm transition-all duration-300">
        <div className="text-blue-400 font-bold text-xl tracking-wide drop-shadow-[0_0_6px_rgba(0,120,255,0.6)]">
          ATS Portal
        </div>

        <nav className="hidden md:flex gap-6 relative">
          {nav
            .filter((item) => item.roles.includes(role))
            .map((item) => {
              const active = pathname.startsWith(item.href);
              const Icon = item.icon;

              const isMega =
                item.name === "Intelligence" ||
                item.name === "Certificates" ||
                item.name === "Payments";

              return isMega ? (
                <button
                  key={item.href}
                  onClick={() => toggleMega(item.name.toLowerCase())}
                  className={`flex items-center gap-2 text-sm ${
                    active ? "text-blue-400 font-semibold" : "text-slate-300 hover:text-blue-300"
                  }`}
                >
                  <Icon size={16} />
                  {item.name} ▼
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm ${
                    active ? "text-blue-400 font-semibold" : "text-slate-300 hover:text-blue-300"
                  }`}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}

          {mega === "intelligence" && (
            <div className="absolute top-10 left-0 bg-slate-900 border border-slate-800 p-4 rounded shadow-xl grid grid-cols-1 gap-2 w-64 animate-fadeIn">
              <Link href="/portal/intelligence/dashboard" className="text-slate-300 hover:text-blue-300">Dashboard</Link>
              <Link href="/portal/intelligence/legitimacy" className="text-slate-300 hover:text-blue-300">Legitimacy</Link>
              <Link href="/portal/intelligence/compliance" className="text-slate-300 hover:text-blue-300">Compliance</Link>
              <Link href="/portal/intelligence/mechanisation" className="text-slate-300 hover:text-blue-300">Mechanisation</Link>
              <Link href="/portal/intelligence/risk" className="text-slate-300 hover:text-blue-300">Risk</Link>
              <Link href="/portal/intelligence/upliftment" className="text-slate-300 hover:text-blue-300">Upliftment</Link>
            </div>
          )}

          {mega === "certificates" && (
            <div className="absolute top-10 left-0 bg-slate-900 border border-slate-800 p-4 rounded shadow-xl grid grid-cols-1 gap-2 w-64 animate-fadeIn">
              <Link href="/portal/certificates" className="text-slate-300 hover:text-blue-300">All Certificates</Link>
              <Link href="/portal/certificates/issue" className="text-slate-300 hover:text-blue-300">Issue Certificate</Link>
            </div>
          )}

          {mega === "payments" && (
            <div className="absolute top-10 left-0 bg-slate-900 border border-slate-800 p-4 rounded shadow-xl grid grid-cols-1 gap-2 w-64 animate-fadeIn">
              <Link href="/portal/payments" className="text-slate-300 hover:text-blue-300">Payments</Link>
              <Link href="/portal/payments/retry-queue" className="text-slate-300 hover:text-blue-300">Retry Queue</Link>
              <Link href="/portal/payments/retry-batch" className="text-slate-300 hover:text-blue-300">Retry Batch</Link>
            </div>
          )}
        </nav>

        <button
          className="md:hidden text-slate-300 text-2xl"
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      <ATSMobileMenu open={open} onClose={() => setOpen(false)} />

      <div className="px-4 py-2 text-sm text-slate-400 flex gap-2">
        {breadcrumbs.map((b, idx) => (
          <span key={b.href}>
            <Link href={b.href} className="hover:text-blue-300">{b.name}</Link>
            {idx < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
      </div>
    </>
  );
}
