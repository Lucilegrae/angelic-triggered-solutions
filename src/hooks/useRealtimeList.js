import { useEffect, useState } from "react";
import { createMultiChannel, removeChannel } from ".../supabaseClient";

/**
 * ✅ Generic realtime list hook
 * @param {string} table - Table name in Supabase
 * @returns {Array} items - Realtime synced list of rows
 */
export function useRealtimeList(table) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const channel = createMultiChannel([
      {
        table,
        handlers: {
          onInsert: (payload) => {
            setItems((prev) => [{ ...payload.new, animate: true }, ...prev]);
          },
          onUpdate: (payload) => {
            setItems((prev) =>
              prev.map((item) =>
                item.id === payload.new.id
                  ? { ...payload.new, animate: true }
                  : item
              )
            );
          },
          onDelete: (payload) => {
            setItems((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          },
        },
      },
    ]);

    return () => {
      removeChannel(channel);
    };
  }, [table]);

  return items;
}
