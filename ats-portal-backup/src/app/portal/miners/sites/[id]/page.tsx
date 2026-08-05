"use client";

export default async function MinerSitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>Miner Site — {id}</div>;
}
