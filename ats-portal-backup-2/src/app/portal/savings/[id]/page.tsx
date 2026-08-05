"use client";

import { useEffect, useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";

export default function SavingsProfilePage({ params }) {
  useStaffGuard();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/savings/${params.id}/profile`);
      const data = await res.json();
      setProfile(data);
    }
    load();
  }, [params.id]);

  if (!profile) return <p className="text-slate-400">Loading…</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Savings Plan Profile</h2>

      <div className="bg-slate-900 p-4 rounded border border-slate-800 mb-6">
        <p className="text-slate-300">Plan: {profile.plan.plan_name}</p>
        <p className="text-slate-300 mt-2">Target: {profile.plan.target_amount}</p>
      </div>

      <h3 className="text-xl font-semibold mb-3">Payments</h3>
      <ul className="list-disc ml-6 text-slate-300">
        {profile.payments.map((p) => (
          <li key={p.id}>
            {p.amount} on {p.receipt_date}
          </li>
        ))}
      </ul>
    </div>
  );
}
