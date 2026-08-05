"use client";

import { useParams } from "next/navigation";

export default function EnvironmentMetricsPage() {
  const { id } = useParams<{ id: string }>();

  return <div>Environment Metrics — {id}</div>;
}
