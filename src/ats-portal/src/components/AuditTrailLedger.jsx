/* ✦ Golden Aura Real-Time Audit Trail Ledger with Role Action Audit Logging ✦ */
import React, { useEffect, useState } from 'react';
import supabase from '.../supabaseClient';
import './theme.css';

export default function AuditTrailLedger({ userRole, userName }) {
  const [records, setRecords] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [archivedToasts, setArchivedToasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchAuditTrail() {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_trail')
        .select('*')
        .order('id', { ascending: false })
        .limit(10);

      if (error) {
        addToast("error", "⚠️ Ritual Error: " + error.message, 5000, "official");
      } else {
        setRecords(data);
        addToast("info", "ℹ️ Connection established to audit trail.", 3000, "general");
      }
      setLoading(false);
    }

    fetchAuditTrail();

    const channel = supabase
      .channel('toast-archive-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'toast_archive' },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            setArchivedToasts(payload.new.data);
            addToast("info", "ℹ️ Archive updated from cloud sync.", 3000, "official");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  function addToast(type, message, duration, role = "general", persistent = false) {
    const id = Date.now();
    const newToast = { id, type, message, persistent, role };
    setToasts((prev) => [...prev, newToast]);

    if (!persistent) {
      setTimeout(() => {
        setToasts((curr) => curr.filter((t) => t.id !== id));
      }, duration);
    }
  }

  async function logRoleAction(action, toastId, details) {
    const { error } = await supabase
      .from('role_action_log')
      .insert({
        timestamp: new Date().toISOString(),
        actor: userName || "Unknown",
        role: userRole,
        action,
        toast_id: toastId,
        details
      });
    if (error) {
      addToast("error", "⚠️ Failed to log role action: " + error.message, 5000, "official");
    } else {
      addToast("success", `✨ Action logged: ${action}`, 3000, "official");
    }
  }

  function dismissToast(id) {
    if (userRole === "official") {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      addToast("info", "ℹ️ Proclamation dismissed by official authority.", 3000, "official");
      logRoleAction("dismiss", id, "Official dismissed proclamation");
    } else {
      addToast("warning", "⚠️ You do not have permission to dismiss proclamations.", 4000, "general");
    }
  }

  function overrideToast(id, newMessage) {
    if (userRole === "official") {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, message: newMessage } : t))
      );
      addToast("success", "✨ Proclamation overridden by official decree.", 4000, "official");
      logRoleAction("override", id, `Official override: ${newMessage}`);
    } else {
      addToast("warning", "⚠️ You do not have permission to override proclamations.", 4000, "general");
    }
  }

  function archiveToast(id) {
    const toast = toasts.find((t) => t.id === id);
    if (toast) {
      const updatedArchive = [...archivedToasts, toast];
      setArchivedToasts(updatedArchive);
      syncArchiveToCloud(updatedArchive);
      logRoleAction("archive", id, "Toast archived");
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  async function syncArchiveToCloud(archive) {
    await supabase
      .from('toast_archive')
      .upsert({ id: "ledger_archive", data: archive });
  }

  const roleFilteredArchive = archivedToasts.filter(
    (t) => t.role === userRole || t.role === "general"
  );

  const filteredToasts = toasts.filter((t) =>
    t.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ border: "2px solid gold", padding: "1rem", color: "gold" }}>
      <h2>✨ Real-Time Audit Trail Ledger ✦</h2>

      <input
        type="text"
        placeholder="🔍 Search proclamations..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="toast-search"
      />

      <div className="toast-container">
        {filteredToasts.map((toast) => (
          <div key={toast.id} className="golden-toast">
            {toast.message}
            {userRole === "official" && (
              <>
                <button className="dismiss-btn" onClick={() => dismissToast(toast.id)}>✖ Dismiss</button>
                <button className="override-btn" onClick={() => overrideToast(toast.id, "⚖️ Official Override: Adjusted proclamation.")}>⚖ Override</button>
              </>
            )}
            <button className="archive-btn" onClick={() => archiveToast(toast.id)}>📜 Archive</button>
          </div>
        ))}
      </div>

      {roleFilteredArchive.length > 0 && (
        <div className="archived-section">
          <h3>📜 Archived Proclamations for {userRole}</h3>
          <ul>
            {roleFilteredArchive.map((toast) => (
              <li key={toast.id}>{toast.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
