import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function useAuditTrail(filters?: {
  sector?: string;
  action?: string;
  actor_role?: string;
  entity_id?: string;
}) {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      let query = supabase
        .from("audit_trail")
        .select("*")
        .order("timestamp", { ascending: false });

      if (filters?.sector) query = query.eq("entity_type", filters.sector);
      if (filters?.action) query = query.eq("action", filters.action);
      if (filters?.actor_role) query = query.eq("actor_role", filters.actor_role);
      if (filters?.entity_id) query = query.eq("entity_id", filters.entity_id);

      const { data } = await query;
      setEntries(data || []);
      setLoading(false);
    }

    load();
  }, [filters]);

  return { entries, loading };
}
