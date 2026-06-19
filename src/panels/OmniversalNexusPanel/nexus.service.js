import { supabase } from "../../supabaseClient";

export const syncNexus = async () => {
  const { data, error } = await supabase
    .rpc("sync_omniversal_nexus");

  if (error) throw new Error(error.message);
  return data;
};
