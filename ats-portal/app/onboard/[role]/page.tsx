"use client";

import { useParams } from "next/navigation";

export default function RoleOnboardPage() {
  const { role } = useParams<{ role: string }>();

  if (!role) {
    return (
      <div className="p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Onboarding: {role.toUpperCase()}
      </h1>

      <p className="text-gray-600 mb-4">
        Load the dynamic form for <strong>{role}</strong> here.
      </p>
    </div>
  );
}
