"use client";

import { useEffect, useState } from "react";

type HousingMemberRow = {
  id: string;
  full_name: string;
  national_id: string;
  address: string;
  status: string;
  value_benchmark: number | null;
};

type Aggregates = {
  total_members: number;
  total_blocks: number;
  total_units: number;
  total_allocations: number;
};

export default function MinistryHousingDashboard() {
  const [members, setMembers] = useState<HousingMemberRow[]>([]);
  const [agg, setAgg] = useState<Aggregates | null>(null);

  useEffect(() => {
    fetch("/api/ministry/housing/overview")
      .then(r => r.json())
      .then(j => {
        if (!j.ok) return;
        setMembers(j.members || []);
        setAgg(j.aggregates || null);
      });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Ministry of Housing Dashboard</h1>

      {agg && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-4 rounded">
            <p className="font-semibold">Total Members</p>
            <p className="text-2xl">{agg.total_members}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded">
            <p className="font-semibold">Total Blocks</p>
            <p className="text-2xl">{agg.total_blocks}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded">
            <p className="font-semibold">Total Units</p>
            <p className="text-2xl">{agg.total_units}</p>
          </div>
          <div className="bg-slate-900 p-4 rounded">
            <p className="font-semibold">Total Allocations</p>
            <p className="text-2xl">{agg.total_allocations}</p>
          </div>
        </div>
      )}

      <div className="bg-slate-900 p-4 rounded">
        <p className="font-semibold mb-2">Housing Members</p>
        <div className="space-y-2">
          {members.map(m => (
            <div
              key={m.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between border border-slate-800 rounded px-3 py-2"
            >
              <div>
                <p className="font-semibold">{m.full_name}</p>
                <p className="text-xs text-slate-400">{m.national_id}</p>
                <p className="text-xs text-slate-400">{m.address}</p>
              </div>
              <div className="text-right mt-2 md:mt-0">
                <p>Status: {m.status}</p>
                <p>Value: {m.value_benchmark ?? "N/A"}</p>
              </div>
            </div>
          ))}
          {members.length === 0 && (
            <p className="text-sm text-slate-400">No housing members yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
