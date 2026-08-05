"use client";

export default async function EnvironmentMetricsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <div>Environment Metrics — {id}</div>;
}
