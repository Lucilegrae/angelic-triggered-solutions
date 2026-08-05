"use client";

import { useEffect, useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";

export default function MembersList() {
  useStaffGuard();

  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch("/api/members/list");
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error("Failed to load members:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMembers();
  }, []);

  if (loading) return <p className="text-slate-400">Loading members…</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Members</h2>

      <a
        href="/portal/members/new"
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        + Register New Member
      </a>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((m) => (
          <a
            key={m.id}
            href={`/portal/members/${m.id}`}
            className="p-4 bg-slate-900 rounded border border-slate-800 hover:bg-slate-800"
          >
            <h3 className="font-semibold text-slate-300">
              {m.surname}, {m.first_names}
            </h3>
            <p className="text-slate-400 mt-2">National ID: {m.nat_id}</p>
            <p className="text-slate-400 mt-2">Phone: {m.phone}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
