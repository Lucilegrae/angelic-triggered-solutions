import { supabase } from "../../supabaseClient";

export const performExport = async (format) => {
  const { data, error } = await supabase
    .rpc("export_anthology", { export_format: format });

  if (error) throw new Error(error.message);
  return data;
};
