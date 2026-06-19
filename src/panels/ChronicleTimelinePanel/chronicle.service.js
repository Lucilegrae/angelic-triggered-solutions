import { supabase } from "../../supabaseClient";

export const fetchChronicleEvents = async () => {
  const { data, error } = await supabase
    .from("chronicle_events")
    .select("*")
    .order("timestamp", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
