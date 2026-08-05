"use client";

import { useParams } from "next/navigation";

export default function MinerSafetyPage() {
  const { id } = useParams<{ id: string }>();

  return <div>Miner Safety — {id}</div>;
}
