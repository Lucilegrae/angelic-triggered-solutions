"use client";

import { useLifecycle } from "@/hooks/useMinistry";

export default function LifecycleDetailPage({ params }: { params: { id: string } }) {
  const token = "";
  const { data: lifecycle } = useLifecycle(token);

  const item = lifecycle?.find((l: any) => String(l.id) === params.id);

  if (!item) return <div>Loading lifecycle…</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        Allocation Lifecycle · {item.full_name}
      </h1>

      <div className="border border-slate-800 rounded-lg p-4 bg-slate-900/40 text-sm space-y-2">
        <p>Unit: {item.unit_code}</p>
        <p>Block: {item.block_name}</p>
        <p>Location: {item.location}</p>
        <p>Status: {item.allocation_status}</p>
        <p>Start: {item.allocation_clock_start}</p>
        <p>Deadline: {item.allocation_deadline}</p>
        <p>Months remaining: {item.months_remaining}</p>
      </div>
    </div>
  );
}
