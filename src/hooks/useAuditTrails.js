import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function useAuditTrails(stakeholderId) {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrails() {
      setLoading(true);
      const { data, error } = await supabase
        .from("audit_trails")
        .select("id, role, action, status, commentary, signature, created_at")
        .eq("stakeholder_id", stakeholderId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching audit trails:", error);
      } else {
        setTrails(data);
      }
      setLoading(false);
    }

    if (stakeholderId) {
      fetchTrails();
    }
  }, [stakeholderId]);

  return { trails, loading };
}
