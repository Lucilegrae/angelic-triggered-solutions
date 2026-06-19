import { supabase } from "../../supabaseClient";

export const fetchAuditEvents = async () => {
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
