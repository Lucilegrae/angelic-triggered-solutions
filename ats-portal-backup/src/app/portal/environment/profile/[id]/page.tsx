"use client";

export default async function EnvironmentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>Environment Profile — {id}</div>;
}
