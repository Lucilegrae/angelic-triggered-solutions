"use client";

import { useAtsMinistry } from "@/context/AtsMinistryContext";

export default function AtsMinistrySelector() {
  const { ministries, selected, select } = useAtsMinistry();

  return (
    <div className="ats-ministry-selector">
      <select
        className="ats-ministry-dropdown"
        value={selected ?? ""}
        onChange={(e) => select(e.target.value)}
      >
        <option value="">Select Ministry...</option>
        {ministries.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
}
