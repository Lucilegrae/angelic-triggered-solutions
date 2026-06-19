import { supabase } from "../../supabaseClient";

export const fetchCosmicUnity = async () => {
  const { data, error } = await supabase
    .rpc("get_cosmic_unity_metrics");

  if (error) throw new Error(error.message);

  return data;
};
