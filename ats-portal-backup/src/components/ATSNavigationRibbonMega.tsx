"use client";

import Link from "next/link";
import { useState } from "react";
import ATSMobileMenu from "./ATSMobileMenu";

export default function ATSNavigationRibbonMega() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(null);

  const toggleMega = (key) => {
    setMega(mega === key ? null : key);
  };

  return (
    <>
      <div className="w-full bg-slate-950 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="text-blue-400 font-bold text-xl tracking-wide">
          ATS Portal
        </div>

        <nav className="hidden md:flex gap-6 relative">
          <button
            onClick={() => toggleMega("intelligence")}
            className="text-slate-300 hover:text-blue-300"
          >
            Intelligence ▼
          </button>

          <button
            onClick={() => toggleMega("certificates")}
            className="text-slate-300 hover:text-blue-300"
          >
            Certificates ▼
          </button>

          <button
            onClick={() => toggleMega("payments")}
            className="text-slate-300 hover:text-blue-300"
          >
            Payments ▼
          </button>

          <Link href="/portal/members" className="text-slate-300 hover:text-blue-300">
            Members
          </Link>
          <Link href="/portal/stakeholders" className="text-slate-300 hover:text-blue-300">
            Stakeholders
          </Link>
          <Link href="/portal/savings" className="text-slate-300 hover:text-blue-300">
            Savings
          </Link>
          <Link href="/portal/institutions" className="text-slate-300 hover:text-blue-300">
            Institutions
          </Link>
          <Link href="/portal/communities" className="text-slate-300 hover:text-blue-300">
            Communities
          </Link>
          <Link href="/portal/staff" className="text-slate-300 hover:text-blue-300">
            Staff
          </Link>

          {mega === "intelligence" && (
            <div className="absolute top-10 left-0 bg-slate-900 border border-slate-800 p-4 rounded shadow-xl grid grid-cols-1 gap-2 w-64">
              <Link href="/portal/intelligence/dashboard" className="text-slate-300 hover:text-blue-300">Dashboard</Link>
              <Link href="/portal/intelligence/legitimacy" className="text-slate-300 hover:text-blue-300">Legitimacy</Link>
              <Link href="/portal/intelligence/compliance" className="text-slate-300 hover:text-blue-300">Compliance</Link>
              <Link href="/portal/intelligence/mechanisation" className="text-slate-300 hover:text-blue-300">Mechanisation</Link>
              <Link href="/portal/intelligence/risk" className="text-slate-300 hover:text-blue-300">Risk</Link>
              <Link href="/portal/intelligence/upliftment" className="text-slate-300 hover:text-blue-300">Upliftment</Link>
            </div>
          )}

          {mega === "certificates" && (
            <div className="absolute top-10 left-0 bg-slate-900 border border-slate-800 p-4 rounded shadow-xl grid grid-cols-1 gap-2 w-64">
              <Link href="/portal/certificates" className="text-slate-300 hover:text-blue-300">All Certificates</Link>
              <Link href="/portal/certificates/issue" className="text-slate-300 hover:text-blue-300">Issue Certificate</Link>
            </div>
          )}

          {mega === "payments" && (
            <div className="absolute top-10 left-0 bg-slate-900 border border-slate-800 p-4 rounded shadow-xl grid grid-cols-1 gap-2 w-64">
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
    </>
  );
}
