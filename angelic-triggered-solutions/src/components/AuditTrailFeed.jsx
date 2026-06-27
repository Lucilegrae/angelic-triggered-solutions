import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";   // ✅ adjust path if needed
import "../theme.css";                      // ✅ unified aura stylesheet

export default function AuditTrailFeed() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("v_audit_trail_narration")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(20);

      if (error) {
        console.error("Error fetching audit trail:", error);
      } else {
        setRecords(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="audit-feed glyph-card reveal">
      <h2 className="aura-heading">✦ Legitimacy Flow Timeline</h2>
      <ul>
        {records.map((row, idx) => (
          <li key={idx} className="audit-entry pledge-line">
            <div className="audit-meta">
              <span className="audit-time">
                {new Date(row.timestamp).toLocaleString()}
              </span>
              <span className="audit-stakeholder">{row.stakeholder}</span>
            </div>
            <div className="audit-narration">{row.narration}</div>
            {row.comment && (
              <div className="audit-comment">💬 {row.comment}</div>
            )}
            {row.signature && (
              <div className="audit-signature">✍️ Signed: {row.signature}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
