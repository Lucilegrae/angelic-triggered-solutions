import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required. Check your .env file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Multi-table channel factory
 * @param {Array} configs - Array of { table, handlers }
 */
export function createMultiChannel(configs = []) {
  let channel = supabase.channel("multi-table-channel");

  configs.forEach(({ table, handlers }) => {
    if (handlers.onInsert) {
      channel = channel.on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table },
        handlers.onInsert
      );
    }
    if (handlers.onUpdate) {
      channel = channel.on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table },
        handlers.onUpdate
      );
    }
    if (handlers.onDelete) {
      channel = channel.on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table },
        handlers.onDelete
      );
    }
  });

  channel.subscribe();
  return channel;
}

export function removeChannel(channel) {
  supabase.removeChannel(channel);
}
