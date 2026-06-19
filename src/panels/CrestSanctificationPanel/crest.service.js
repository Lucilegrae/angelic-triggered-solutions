import { supabase } from "../../supabaseClient";

export const applyCrest = async (aura) => {
  const { data, error } = await supabase
    .from("crests")
    .insert([{ aura }]);

  if (error) throw new Error(error.message);
  return data;
};
