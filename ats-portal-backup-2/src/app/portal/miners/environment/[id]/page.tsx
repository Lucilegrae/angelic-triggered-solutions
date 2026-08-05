"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import type { Database } from "@/types/supabase";

type EnvProfile =
  Database["public"]["Functions"]["environment_profile"]["Returns"];

export default async function MinerEnvironmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [env, setEnv] = useState<EnvProfile | null>(null);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.rpc("environment_profile", {
        environment_id: id,
      });

      if (error) console.error(error);
      setEnv(data ?? null);
    }

    load();
  }, [id]);

  if (!env) return <div className="p-6 text-slate-200">Loading…</div>;

  return (
    <div className="p-6 text-slate-200">
      <h1 className="text-2xl font-bold">{env.site_name}</h1>
      <p>Location: {env.location}</p>
      <p>Sensitivity: {env.sensitivity_level}</p>
    </div>
  );
}
