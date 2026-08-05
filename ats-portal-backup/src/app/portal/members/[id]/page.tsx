"use client";

import { useEffect, useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";

export default function MemberProfile({ params }) {
  useStaffGuard();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMember() {
      const res = await fetch(`/api/members/${params.id}/profile`);
      const data = await res.json();
      setMember(data);
      setLoading(false);
    }
    loadMember();
  }, [params.id]);

  if (loading) return <p className="text-slate-400">Loading member…</p>;
  if (!member) return <p className="text-red-400">Member not found.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Member Profile</h2>

      <div className="bg-slate-900 p-4 rounded border border-slate-800 mb-6">
        <p className="text-slate-300">Name: {member.surname}, {member.first_names}</p>
        <p className="text-slate-300 mt-2">National ID: {member.nat_id}</p>
        <p className="text-slate-300 mt-2">Phone: {member.phone}</p>
        <p className="text-slate-300 mt-2">Address: {member.address}</p>
      </div>

      <a
        href={`/portal/members/${params.id}/edit`}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Edit Member
      </a>
    </div>
  );
}
