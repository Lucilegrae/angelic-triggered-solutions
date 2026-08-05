"use client";


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
        <a href="/portal" className="text-slate-300 hover:text-blue-300">Dashboard</a>
        <a href="/portal/members" className="text-slate-300 hover:text-blue-300">Members</a>
        <a href="/portal/stakeholders" className="text-slate-300 hover:text-blue-300">Stakeholders</a>
        <a href="/portal/savings" className="text-slate-300 hover:text-blue-300">Savings</a>
        <a href="/portal/payments" className="text-slate-300 hover:text-blue-300">Payments</a>
        <a href="/portal/certificates" className="text-slate-300 hover:text-blue-300">Certificates</a>
        <a href="/portal/institutions" className="text-slate-300 hover:text-blue-300">Institutions</a>
        <a href="/portal/communities" className="text-slate-300 hover:text-blue-300">Communities</a>
        <a href="/portal/intelligence/dashboard" className="text-slate-300 hover:text-blue-300">Intelligence</a>
        <a href="/portal/staff" className="text-slate-300 hover:text-blue-300">Staff</a>
      </nav>
    </div>
  );
}
