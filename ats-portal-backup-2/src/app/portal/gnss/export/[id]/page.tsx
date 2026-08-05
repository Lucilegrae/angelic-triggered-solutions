"use client";

export default async function GNSSExportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>GNSS Export — {id}</div>;
}
