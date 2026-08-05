"use client";

import { useRouter } from "next/navigation";

const sectors = [
  { role: "community", label: "Community", icon: "👥", color: "#2563eb" },
  { role: "community_member", label: "Community Member", icon: "🧍", color: "#1d4ed8" },
  { role: "miner", label: "Miner", icon: "⛏️", color: "#b45309" },
  { role: "bank", label: "Bank", icon: "🏦", color: "#047857" },
  { role: "investor", label: "Investor", icon: "💼", color: "#0f766e" },
  { role: "government", label: "Government", icon: "🏛️", color: "#7c3aed" },
  { role: "council", label: "Council", icon: "🏘️", color: "#9333ea" },
  { role: "suppliers", label: "Suppliers", icon: "📦", color: "#d97706" },
  { role: "transport", label: "Transport", icon: "🚚", color: "#dc2626" },
  { role: "donors", label: "Donors", icon: "🎁", color: "#059669" },
  { role: "insurance", label: "Insurance", icon: "🛡️", color: "#0ea5e9" },
];

export default function StakeholderSelectionMenu() {
  const router = useRouter();

  function handleSelect(role: string) {
    router.push(`/onboard/${role}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Select Your Stakeholder Role</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sectors.map((s) => (
          <button
            key={s.role}
            onClick={() => handleSelect(s.role)}
            className="border rounded-lg p-4 shadow bg-white flex flex-col items-center gap-3 hover:scale-[1.03] transition-all"
            style={{ borderLeft: `6px solid ${s.color}` }}
          >
            <span style={{ fontSize: "2rem" }}>{s.icon}</span>
            <span className="font-semibold">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
