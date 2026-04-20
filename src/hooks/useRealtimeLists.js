import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

/**
 * ✅ Realtime lists hook with preload + filters + audit trail logging
 * @param {Array} tables - Array of table names to subscribe to
 * @param {Object} filters - Optional filters keyed by table name
 * @returns {Object} lists - Object keyed by table name
 */
export function useRealtimeLists(tables = [], filters = {}) {
  const [lists, setLists] = useState(() =>
    tables.reduce((acc, t) => ({ ...acc, [t]: [] }), {})
  );
  const [loading, setLoading] = useState(true);

  // ✦ Audit Trail Logger ✦
  const logAudit = async (action, details) => {
    try {
      await supabase.from("audit_trail").insert([
        {
          action,                // e.g. "FILTER_CHANGE", "DATA_RELOAD", "INSERT"
          details: JSON.stringify(details),
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error("Audit log failed:", err.message);
    }
  };

  useEffect(() => {
    async function preloadData() {
      setLoading(true);
      try {
        await logAudit("DATA_RELOAD", { tables, filters });

        const results = await Promise.all(
          tables.map((table) => {
            let query = supabase.from(table).select("*");

            // ✅ Apply filters if provided
            const f = filters[table];
            if (f) {
              if (f.stakeholderId) query = query.eq("stakeholder_id", f.stakeholderId);
              if (f.dateFilter) query = query.gt("created_at", f.dateFilter);
              if (f.arcKeyword) query = query.like("ceremonial_arc", `%${f.arcKeyword}%`);
              if (f.roleFilter) query = query.eq("role", f.roleFilter);
              if (f.emailKeyword) query = query.like("email", `%${f.emailKeyword}%`);
            }

            return query.order("created_at", { ascending: false });
          })
        );

        const newLists = {};
        tables.forEach((table, i) => {
          if (results[i].error) {
            console.error(`Error fetching ${table}:`, results[i].error);
            newLists[table] = [];
          } else {
            newLists[table] = results[i].data || [];
          }
        });

        setLists(newLists);
      } finally {
        setLoading(false);
      }
    }

    preloadData();

    // ✅ Realtime subscriptions with audit logging
    const channels = tables.map((table) =>
      supabase
        .channel(`${table}-changes`)
        .on("postgres_changes", { event: "*", schema: "public", table }, async (payload) => {
          let updated = [...lists[table]];
          let action = payload.eventType;

          if (action === "INSERT") {
            updated = [{ ...payload.new, animate: true }, ...updated];
          } else if (action === "UPDATE") {
            updated = updated.map((item) =>
              item.id === payload.new.id ? { ...payload.new, animate: true } : item
            );
          } else if (action === "DELETE") {
            updated = updated.filter((item) => item.id !== payload.old.id);
          }

          setLists((prev) => ({ ...prev, [table]: updated }));

          // Log audit trail
          await logAudit(action, { table, payload });
        })
        .subscribe()
    );

    return () => {
      channels.forEach((ch) => supabase.removeChannel(ch));
    };
  }, [tables, filters]);

  // Log whenever filters change
  useEffect(() => {
    logAudit("FILTER_CHANGE", { filters });
  }, [filters]);

  return { ...lists, loading };
}
