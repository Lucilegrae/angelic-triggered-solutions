"use client";

import { useParams } from "next/navigation";

export default function MinerSitePage() {
  const { id } = useParams<{ id: string }>();

  return <div>Miner Site — {id}</div>;
}
