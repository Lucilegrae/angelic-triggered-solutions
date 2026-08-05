"use client";

export default async function MinerSafetyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>Miner Safety — {id}</div>;
}
