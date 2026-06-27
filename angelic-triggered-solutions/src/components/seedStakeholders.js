import { supabase } from "./supabaseClient.js";

async function seedStakeholders() {
  const { error } = await supabase.from("stakeholder_roles").insert([
    { role: "government", stakeholder_name: "Government of Zimbabwe" },
    { role: "investor", stakeholder_name: "Global Capital Partners" },
    { role: "miner", stakeholder_name: "Zimbabwe Mining Syndicate" },
    { role: "community", stakeholder_name: "Community Trust Harare" }
  ]);

  if (error) console.error(error);
  else console.log("Stakeholder roles seeded");
}

seedStakeholders();
