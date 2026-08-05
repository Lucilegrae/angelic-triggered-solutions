"use client";

export default async function GNSSRoverPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>GNSS Rover — {id}</div>;
}
