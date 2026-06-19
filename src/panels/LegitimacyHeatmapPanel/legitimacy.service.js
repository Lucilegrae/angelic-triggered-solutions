import { supabase } from "../../supabaseClient";

export const fetchHeatmapData = async () => {
  const { data, error } = await supabase
    .from("legitimacy_regions")
    .select("*");

  if (error) throw new Error(error.message);
  return { regions: data };
};
