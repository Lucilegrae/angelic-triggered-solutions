"use client";

export default async function GNSSBaselinesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>GNSS Baselines — {id}</div>;
}
