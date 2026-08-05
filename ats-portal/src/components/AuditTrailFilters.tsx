"use client";

import { useState } from "react";
import useAuditTrail from "@/hooks/useAuditTrail";

export default function AuditTrailFilters() {
  const [filters, setFilters] = useState({});
  const { entries, loading } = useAuditTrail(filters);

  function updateFilter(key: string, value: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: value.trim() === "" ? undefined : value.trim(),
    }));
  }

  return (
    <div className="p-4 aura-card">
      <h2 className="text-xl font-bold mb-4">Audit Trail Filters</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          placeholder="Sector (e.g., council)"
          className="border p-2 rounded"
          onChange={(e) => updateFilter("sector", e.target.value)}
        />

        <input
          placeholder="Action (created, status_update)"
          className="border p-2 rounded"
          onChange={(e) => updateFilter("action", e.target.value)}
        />

        <input
          placeholder="Actor Role (golden_star_engine)"
          className="border p-2 rounded"
          onChange={(e) => updateFilter("actor_role", e.target.value)}
        />

        <input
          placeholder="Entity ID (UUID)"
          className="border p-2 rounded"
          onChange={(e) => updateFilter("entity_id", e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading audit trail...</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => (
            <li key={e.id} className="border p-3 rounded bg-white shadow">
              <p>
                <strong>{e.entity_type.toUpperCase()}</strong> — {e.action}
              </p>

              <p className="text-sm text-gray-600">{e.commentary}</p>

              <p className="text-xs text-gray-500">
                Actor: {e.actor_role} ({e.actor_id})
              </p>

              <p className="text-xs text-gray-500">
                Entity ID: {e.entity_id}
              </p>

              <p className="text-xs text-gray-500">
                {new Date(e.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
