"use client";

export default async function GNSSSessionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>GNSS Sessions — {id}</div>;
}
