import { supabase } from "../../supabaseClient";

export const fetchScenarios = async () => {
  const { data, error } = await supabase
    .from("scenarios")
    .select("*");

  if (error) throw new Error(error.message);

  return data;
};
