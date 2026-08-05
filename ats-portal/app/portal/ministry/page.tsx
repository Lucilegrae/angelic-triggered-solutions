"use client";

import { useAtsMinistry } from "@/context/AtsMinistryContext";
import MinistryProfileCard from "@/components/ats/ministry/MinistryProfileCard";

export default function MinistryDashboard() {
  const { selected } = useAtsMinistry();

  return (
    <div className="ats-container">
      <h1 className="aura-title">🏛 Ministry Intelligence</h1>

      {selected ? (
        <MinistryProfileCard ministry_id={selected} />
      ) : (
        <p>Please select a ministry from the topbar.</p>
      )}
    </div>
  );
}
