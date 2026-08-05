import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "../theme.css";
import AuditTrailPanel from "./AuditTrailPanel";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function DashboardInitiation() {
  const [role, setRole] = useState(null);
  const [flows, setFlows] = useState([]);

  // Federation Stats
  const [stats, setStats] = useState({
    totalCerts: 0,
    sectors: {}
  });

  // Load legitimacy flows + user role
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

  // Load ATS Federation Certificate Stats
  async function loadStats() {
    const { data, error } = await supabase
      .from("ats_certificates")
      .select("sector");

    if (error) {
      console.error("Dashboard load error:", error.message);
      return;
    }

    const sectorCounts = {};

    data.forEach((row) => {
      const key = row.sector;
      sectorCounts[key] = (sectorCounts[key] || 0) + 1;
    });

    setStats({
      totalCerts: data.length,
      sectors: sectorCounts
    });
  }

  useEffect(() => {
    loadStats();
  }, []);

  // Map role to chamber + item classes
  const roleClassMap = {
    government: { chamber: "gov-chamber", item: "gov-item" },
    investor: { chamber: "inv-chamber", item: "inv-item" },
    miner: { chamber: "miner-chamber", item: "miner-item" },
    community: { chamber: "comm-chamber", item: "comm-item" }
  };

  const { chamber, item } = roleClassMap[role?.toLowerCase()] || {
    chamber: "star-chamber",
    item: "audit-trail-item"
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

      {/* ATS Federation Stats */}
      <div className="federation-stats aura-card">
        <h3 className="glow">ATS Federation Overview</h3>
        <p>Total Certificates Issued: {stats.totalCerts}</p>

        <h4>Sector Breakdown</h4>
        <ul>
          {Object.entries(stats.sectors).map(([sector, count]) => (
            <li key={sector}>
              {sector}: {count}
            </li>
          ))}
        </ul>
      </div>

      {/* Legitimacy Flows */}
      <ul className="audit-trail-list navigation-flow">
        {flows.map((flow) => (
          <li key={flow.id} className={`audit-trail-item ${item}`}>
            <span className="flow-name">{flow.kpi_name}</span>
            <span className="flow-value">{flow.kpi_value}</span>

            <AuditTrailPanel stakeholderId={flow.created_by} role={role} />
          </li>
        ))}
      </ul>
    </div>
  );
}
