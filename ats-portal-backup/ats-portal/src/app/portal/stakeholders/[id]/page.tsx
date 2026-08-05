"use client";

import { useEffect, useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";

export default function StakeholderProfile({ params }) {
  useStaffGuard();

  const [item, setItem] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/stakeholders/${params.id}/profile`);
      const data = await res.json();
      setItem(data);
    }
    load();
  }, [params.id]);

  if (!item) return <p className="text-slate-400">Loading…</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stakeholder Profile</h2>

      <div className="bg-slate-900 p-4 rounded border border-slate-800">
        <p className="text-slate-300">Name: {item.name}</p>
        <p className="text-slate-300 mt-2">Type: {item.type}</p>
        <p className="text-slate-300 mt-2">Phone: {item.phone}</p>
        <p className="text-slate-300 mt-2">Address: {item.address}</p>
      </div>
    </div>
  );
}
