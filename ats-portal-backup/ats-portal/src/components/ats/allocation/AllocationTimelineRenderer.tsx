"use client";

import { useEffect, useState } from "react";

export default function AllocationTimelineRenderer({ allocation }: { allocation: any[] }) {
  const [timeline, setTimeline] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < allocation.length) {
      const timer = setTimeout(() => {
        setTimeline((prev) => [...prev, allocation[index]]);
        setIndex(index + 1);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [index, allocation]);

  return (
    <div className="timeline-container">
      <h3 className="aura-heading">⏳ Allocation Timeline</h3>
      <p className="aura-text">Chronological flow of ATS allocation events.</p>

      <div className="timeline">
        {timeline.map((t, i) => (
          <div key={t.member_id} className={`timeline-node timeline-tier-${t.privilegeRank.replace(" ", "").toLowerCase()}`}>
            <div className="timeline-index">Event {i + 1}</div>
            <div className="timeline-name">{t.member_name}</div>
            <div className="timeline-policy">{t.policy_number}</div>
            <div className="timeline-rank">{t.privilegeRank}</div>
            <div className="timeline-score">Score: {t.privilegeScore}</div>

            {t.allocated ? (
              <div className="timeline-unit">
                Assigned → Block {t.block}, Unit {t.unit_number}
              </div>
            ) : (
              <div className="timeline-unit timeline-unallocated">
                Overflow → No available units
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
