import { supabase } from "./supabaseClient.js";

async function seedAuditTrails() {
  const { error } = await supabase.from("audit_trails").insert([
    {
      stakeholder_id: "960e2d58-f0ed-4339-841f-558f3ce19b0d", // government
      role: "government",
      action: "affirmed",
      status: "affirmed",
      commentary: "Budget allocation approved for community projects",
      signature: "Minister of Finance",
    },
    {
      stakeholder_id: "ec990513-3df5-430f-82dd-775957cd2660", // investor
      role: "investor",
      action: "rejected",
      status: "rejected",
      commentary: "Investment terms require revision before approval",
      signature: "Global Capital Partners",
    },
    {
      stakeholder_id: "49ef836f-becc-49ba-a6ca-49aafd324bee", // miner
      role: "miner",
      action: "affirmed",
      status: "affirmed",
      commentary: "Mining expansion plan aligned with covenant goals",
      signature: "Zimbabwe Mining Syndicate",
    },
    {
      stakeholder_id: "cf291fc5-c1ca-4ef9-9304-672baf22b871", // community
      role: "community",
      action: "affirmed",
      status: "affirmed",
      commentary: "Community supports the new development initiative",
      signature: "Community Trust Harare",
    }
  ]);

  if (error) console.error(error);
  else console.log("Audit trails seeded");
}

seedAuditTrails();
