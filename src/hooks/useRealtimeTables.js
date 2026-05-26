import { useEffect, useState } from "react";
import { supabase, createMultiChannel, removeChannel } from ".../supabaseClient";

/**
 * useRealtimeTables
 * @param {Array} configs - Array of { table, handlers, filter }
 * Example:
 * [
 *   { table: "affirmations", filter: q => q.gt("created_at", "2026-04-01") },
 *   { table: "projects", filter: q => q.eq("stakeholder_id", 42) }
 * ]
 * @returns {Object} - { data, loading, error }
 */
export function useRealtimeTables(configs = []) {
  const initialState = configs.reduce((acc, { table }) => {
    acc[table] = [];
    return acc;
  }, {});

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const results = await Promise.all(
          configs.map(async ({ table, filter }) => {
            let query = supabase.from(table).select("*").order("created_at", { ascending: false });
            if (typeof filter === "function") {
              query = filter(query);
            }
            const { data: rows, error } = await query;
            if (error) throw error;
            return { table, rows };
          })
        );

        const newState = results.reduce((acc, { table, rows }) => {
          acc[table] = rows;
          return acc;
        }, {});
        setData(newState);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();

    const channel = createMultiChannel(
      configs.map(({ table, handlers }) => ({
        table,
        handlers: {
          onInsert: (payload) => {
            if (handlers?.onInsert) handlers.onInsert(payload);
            setData((prev) => ({
              ...prev,
              [table]: [{ ...payload.new }, ...prev[table]],
            }));
          },
          onUpdate: (payload) => {
            if (handlers?.onUpdate) handlers.onUpdate(payload);
            setData((prev) => ({
              ...prev,
              [table]: prev[table].map((row) =>
                row.id === payload.new.id ? payload.new : row
              ),
            }));
          },
          onDelete: (payload) => {
            if (handlers?.onDelete) handlers.onDelete(payload);
            setData((prev) => ({
              ...prev,
              [table]: prev[table].filter((row) => row.id !== payload.old.id),
            }));
          },
        },
      }))
    );

    return () => {
      removeChannel(channel);
    };
  }, [configs]);

  return { data, loading, error };
}
