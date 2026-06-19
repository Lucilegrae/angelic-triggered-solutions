import { supabase } from "../../supabaseClient";

export const fetchResourceFlows = async () => {
  const { data, error } = await supabase
    .from("resource_flows")
    .select("*");

  if (error) throw new Error(error.message);
  return data;
};
