import { supabase } from "../../supabaseClient";

export const triggerCadence = async (type) => {
  const { data, error } = await supabase
    .rpc("run_cadence", { cadence_type: type });

  if (error) throw new Error(error.message);
  return data;
};

export const triggerExport = async (format) => {
  const { data, error } = await supabase
    .rpc("run_export", { export_format: format });

  if (error) throw new Error(error.message);
  return data;
};
