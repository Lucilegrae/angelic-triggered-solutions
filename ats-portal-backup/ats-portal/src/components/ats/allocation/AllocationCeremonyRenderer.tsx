"use client";

import { useEffect, useState } from "react";

export default function AllocationCeremonyRenderer({ allocation }: { allocation: any[] }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < allocation.length) {
      const timer = setTimeout(() => setStep(step + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [step, allocation.length]);

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">🏛 Allocation Ceremony</h3>
      <p className="aura-text">Ceremonial procession of allocation privilege.</p>

      <div className="ceremony-container">
        {allocation.slice(0, step).map((a, index) => (
          <div key={a.member_id} className={`ceremony-card ceremony-tier-${a.privilegeRank.replace(" ", "").toLowerCase()}`}>
            <div className="ceremony-step">Step {index + 1}</div>
            <div className="ceremony-name">{a.member_name}</div>
            <div className="ceremony-policy">{a.policy_number}</div>
            <div className="ceremony-rank">{a.privilegeRank}</div>
            <div className="ceremony-score">Score: {a.privilegeScore}</div>

            {a.allocated ? (
              <div className="ceremony-unit">
                Allocated → Block {a.block}, Unit {a.unit_number}
              </div>
            ) : (
              <div className="ceremony-unit ceremony-unallocated">
                Not allocated (no available units)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
