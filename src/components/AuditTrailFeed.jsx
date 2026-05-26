import React, { useEffect, useState } from "react";
import supabase from ".../supabaseClient";   // ✅ adjust path if needed
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
    <section className="aura-bg min-h-screen p-8 text-white">
      <h1 className="aura-heading">✦ Legitimacy Flow Timeline</h1>
      <div className="grid grid-cols-1 gap-6">
        {records.map((row, idx) => (
          <div
            key={idx}
            className={`glyph-card reveal p-4 rounded-lg`}
          >
            <div className="audit-meta">
              <span className="audit-time pledge-line">
                {new Date(row.timestamp).toLocaleString()}
              </span>
              <span className="audit-stakeholder pledge-line">
                {row.stakeholder}
              </span>
            </div>
            <div className="audit-narration pledge-line">{row.narration}</div>
            {row.comment && (
              <div className="audit-comment pledge-line">💬 {row.comment}</div>
            )}
            {row.signature && (
              <div className="audit-signature pledge-line">
                ✍️ Signed: {row.signature}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
