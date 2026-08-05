"use client";

export default async function EnvironmentIncidentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>Environment Incidents — {id}</div>;
}
