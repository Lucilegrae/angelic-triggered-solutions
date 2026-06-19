import { supabase } from "../../supabaseClient";

export const buildPreview = (form) => ({
  ...form,
  issued_at: new Date().toISOString(),
});

export const saveCertificate = async (certificate) => {
  const { data, error } = await supabase
    .from("certificates")
    .insert([certificate]);

  if (error) throw new Error(error.message);
  return data;
};
