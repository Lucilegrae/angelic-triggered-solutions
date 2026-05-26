import React, { useState } from "react";
import { supabase } from ".../supabaseClient";
import "../theme.css"; // aura modal styles already defined

export default function AuditTrailPanel({ stakeholderId, role }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("affirmed");
  const [commentary, setCommentary] = useState("");
  const [signature, setSignature] = useState("");

  const submitAudit = async () => {
    const { error } = await supabase.from("audit_trails").insert([
      {
        stakeholder_id: stakeholderId,
        role,
        action,
        status: action,
        commentary,
        signature,
      },
    ]);
    if (!error) {
      setOpen(false);
      setCommentary("");
      setSignature("");
    } else {
      console.error("Audit trail error:", error);
    }
  };

  return (
    <>
      <button className="aura-card" onClick={() => setOpen(true)}>
        ✍️ Log Affirmation/Rejection
      </button>

      {open && (
        <div className="aura-overlay active">
          <div className="aura-modal">
            <div className="modal-header">Audit Trail Ritual</div>
            <div className="modal-content">
              <label>
                Action:
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                >
                  <option value="affirmed">Affirmed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </label>
              <br />
              <label>
                Commentary:
                <textarea
                  value={commentary}
                  onChange={(e) => setCommentary(e.target.value)}
                />
              </label>
              <br />
              <label>
                Signature:
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="aura-card" onClick={submitAudit}>
                ✅ Submit
              </button>
              <button className="aura-card" onClick={() => setOpen(false)}>
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
