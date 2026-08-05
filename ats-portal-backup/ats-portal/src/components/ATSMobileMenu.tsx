"use client";

import Link from "next/link";

export default function ATSMobileMenu({ open, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
        <span className="text-blue-400 font-bold text-lg">ATS Menu</span>
        <button onClick={onClose} className="text-slate-300 text-xl">×</button>
      </div>

      <nav className="flex flex-col p-4 gap-4">
        <Link href="/portal" className="text-slate-300 hover:text-blue-300">Dashboard</Link>
        <Link href="/portal/members" className="text-slate-300 hover:text-blue-300">Members</Link>
        <Link href="/portal/stakeholders" className="text-slate-300 hover:text-blue-300">Stakeholders</Link>
        <Link href="/portal/savings" className="text-slate-300 hover:text-blue-300">Savings</Link>
        <Link href="/portal/payments" className="text-slate-300 hover:text-blue-300">Payments</Link>
        <Link href="/portal/certificates" className="text-slate-300 hover:text-blue-300">Certificates</Link>
        <Link href="/portal/institutions" className="text-slate-300 hover:text-blue-300">Institutions</Link>
        <Link href="/portal/communities" className="text-slate-300 hover:text-blue-300">Communities</Link>
        <Link href="/portal/intelligence/dashboard" className="text-slate-300 hover:text-blue-300">Intelligence</Link>
        <Link href="/portal/staff" className="text-slate-300 hover:text-blue-300">Staff</Link>
      </nav>
    </div>
  );
}
