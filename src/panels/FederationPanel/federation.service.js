import { supabase } from "../../supabaseClient";

export const fetchFederationData = async () => {
  const { data, error } = await supabase
    .from("institutions")
    .select("id, name, legitimacy_score");

  if (error) throw new Error(error.message);

  return { institutions: data };
};
