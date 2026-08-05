"use client";

export default function AllocationQueueVisualizer({ allocation }: { allocation: any[] }) {
  return (
    <div className="ats-panel">
      <h3 className="aura-heading">📜 Allocation Queue</h3>
      <p className="aura-text">Ordered by ATS privilege score (highest first).</p>

      <ol className="queue-list">
        {allocation.map((a, index) => (
          <li key={a.member_id} className="queue-item">
            <span className="queue-position">#{index + 1}</span>
            <span className="queue-name">{a.member_name}</span>
            <span className="queue-policy">{a.policy_number}</span>
            <span className="queue-rank">{a.privilegeRank}</span>
            <span className="queue-score">{a.privilegeScore}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
