import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient"; // adjust path to your Supabase client

function AuditTrailFeed() {
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
    <div className="audit-feed">
      <h2>Legitimacy Flow Timeline</h2>
      <ul>
        {records.map((row, idx) => (
          <li key={idx} className="audit-entry">
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

export default AuditTrailFeed;
