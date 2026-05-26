import React, { useEffect, useState } from "react";
import { supabase } from ".../supabaseClient";
import "../theme.css";
import AuditTrailPanel from "./AuditTrailPanel";

export default function DashboardInitiation() {
  const [role, setRole] = useState(null);
  const [flows, setFlows] = useState([]);

  useEffect(() => {
    const fetchFlows = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const userRole = user?.app_metadata?.role;
      setRole(userRole);

      if (userRole) {
        const { data, error } = await supabase
          .from("legitimacy_flows")
          .select("*")
          .eq("role", userRole);

        if (!error) setFlows(data);
      }
    };
    fetchFlows();
  }, []);

  // Map role to chamber + item classes
  const roleClassMap = {
    government: { chamber: "gov-chamber", item: "gov-item" },
    investor: { chamber: "inv-chamber", item: "inv-item" },
    miner: { chamber: "miner-chamber", item: "miner-item" },
    community: { chamber: "comm-chamber", item: "comm-item" },
  };

  const { chamber, item } = roleClassMap[role?.toLowerCase()] || {
    chamber: "star-chamber",
    item: "audit-trail-item",
  };

  if (!role) {
    return (
      <div className="aura-glyph sealed">
        🔒 Sealed Chamber — Unauthorized entities encounter aura glyph barriers
      </div>
    );
  }

  return (
    <div className={chamber}>
      <h2 className="constellation-glyph">
        ✨ {role.toUpperCase()} Covenant Chamber ✨
      </h2>
      <ul className="audit-trail-list navigation-flow">
        {flows.map(flow => (
          <li key={flow.id} className={`audit-trail-item ${item}`}>
            <span className="flow-name">{flow.kpi_name}</span>
            <span className="flow-value">{flow.kpi_value}</span>
            {/* Ritual logging panel for each flow */}
            <AuditTrailPanel stakeholderId={flow.created_by} role={role} />
          </li>
        ))}
      </ul>
    </div>
  );
}
