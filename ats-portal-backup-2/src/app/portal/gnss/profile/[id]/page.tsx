"use client";

import { supabase } from "@/supabaseClient";

export default async function GNSSProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>GNSS Profile — {id}</div>;
}
