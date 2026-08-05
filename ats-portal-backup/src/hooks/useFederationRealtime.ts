"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useFederationRealtime(callback: (payload: any) => void) {
  useEffect(() => {
    const channel = supabase
      .channel("federation_tasks")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "federation_tasks" },
        (payload) => callback(payload)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
}
