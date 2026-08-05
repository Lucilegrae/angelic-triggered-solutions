import useAuditTrail from "@/hooks/useAuditTrail";

const sectorIcons: Record<string, string> = {
  community: "👥",
  community_member: "🧍",
  miner: "⛏️",
  bank: "🏦",
  investor: "💼",
  government: "🏛️",
  council: "🏘️",
  suppliers: "📦",
  transport: "🚚",
  donors: "🎁",
  insurance: "🛡️",
};

const sectorColors: Record<string, string> = {
  community: "#2563eb",
  community_member: "#1d4ed8",
  miner: "#b45309",
  bank: "#047857",
  investor: "#0f766e",
  government: "#7c3aed",
  council: "#9333ea",
  suppliers: "#d97706",
  transport: "#dc2626",
  donors: "#059669",
  insurance: "#0ea5e9",
};

export default function AuditTrailViewer() {
  const { entries, loading } = useAuditTrail();

  if (loading) return <p>Loading audit trail...</p>;

  return (
    <div className="p-4 aura-card">
      <h2 className="text-xl font-bold mb-4">Audit Trail Viewer</h2>

      <ul className="space-y-3">
        {entries.map((e, index) => {
          const icon = sectorIcons[e.entity_type] || "📄";
          const color = sectorColors[e.entity_type] || "#374151";

          return (
            <li
              key={e.id}
              className="border p-3 rounded bg-white shadow opacity-0 translate-y-4 animate-fadeSlideIn"
              style={{
                borderLeft: `6px solid ${color}`,
                animationDelay: `${index * 0.08}s`,
              }}
            >
              <p className="flex items-center gap-2">
                <span style={{ fontSize: "1.4rem" }}>{icon}</span>
                <strong style={{ color }}>{e.entity_type.toUpperCase()}</strong>
                — {e.action}
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
          );
        })}
      </ul>
    </div>
  );
}
