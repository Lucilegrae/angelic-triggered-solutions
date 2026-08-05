"use client";

import { useParams } from "next/navigation";

export default function MinerEnvironmentPage() {
  const { id } = useParams<{ id: string }>();

  return <div>Miner Environment — {id}</div>;
}
