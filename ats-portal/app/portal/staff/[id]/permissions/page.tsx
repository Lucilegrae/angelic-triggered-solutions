"use client";

import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useStaffGuard } from "@/hooks/useStaffGuard";

export default function StaffPermissionsPage() {
  useStaffGuard();

  const [role, setRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRole() {
      try {
        const res = await fetch(`/api/staff/${id}/permissions`);
        const data = await res.json();
        setRole(data.role);
      } catch (err) {
        console.error("Failed to load staff role:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRole();
  }, [id]);

  if (loading) {
    return <p className="text-slate-400">Loading staff permissions…</p>;
  }

  if (!role) {
    return <p className="text-red-400">Failed to load staff role.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Staff Permissions</h2>

      <p className="text-slate-300 mb-6">
        Staff Role: <span className="font-bold text-blue-400">{role}</span>
      </p>

      <PermissionMatrix role={role} />
    </div>
  );
}

function PermissionMatrix({ role }) {
  const permissions = {
    admin: [
      "Full access to all modules",
      "Manage staff accounts",
      "Create, update, delete members",
      "Create, update, delete stakeholders",
      "Create, update government departments",
      "Issue and revoke certificates",
      "View intelligence dashboards",
    ],
    officer: [
      "Create and update members",
      "Create and update stakeholders",
      "Create and update savings plans",
      "Record payments",
      "View intelligence dashboards",
    ],
    clerk: [
      "Read-only access to members",
      "Read-only access to stakeholders",
      "Read-only access to payments",
      "Read-only access to certificates",
    ],
  };

  const list = permissions[role] || [];

  return (
    <div className="bg-slate-900 p-4 rounded border border-slate-800">
      <h3 className="text-xl font-semibold mb-3">Role Capabilities</h3>

      <ul className="list-disc ml-6 text-slate-300">
        {list.map((item, idx) => (
          <li key={idx} className="mb-2">{item}</li>
        ))}
      </ul>
    </div>
  );
}
