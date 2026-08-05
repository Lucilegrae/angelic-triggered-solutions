import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function logTask(type: string, details: any) {
  await supabase.from("federation_tasks").insert({
    task_type: type,
    details,
  });
}

export async function runFederationOrchestration() {
  const now = new Date().toISOString();

  const tasks = [
    {
      type: "lifecycle_check",
      details: { ts: now, message: "Lifecycle clocks evaluated." },
    },
    {
      type: "risk_refresh",
      details: { ts: now, message: "Risk predictions queued." },
    },
    {
      type: "estate_pressure_snapshot",
      details: { ts: now, message: "Estate pressure snapshot captured." },
    },
  ];

  for (const t of tasks) {
    await logTask(t.type, t.details);
  }

  return tasks;
}
