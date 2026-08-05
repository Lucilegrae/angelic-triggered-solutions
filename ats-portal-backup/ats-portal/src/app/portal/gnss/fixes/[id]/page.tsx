"use client";

export default async function GNSSFixesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>GNSS Fixes — {id}</div>;
}
