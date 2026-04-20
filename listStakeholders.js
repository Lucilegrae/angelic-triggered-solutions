import { supabase } from "./supabaseClient.js";

async function listStakeholders() {
  const { data, error } = await supabase.from("stakeholder_roles").select("id, role");
  if (error) console.error(error);
  else console.log(data);
}

listStakeholders();
