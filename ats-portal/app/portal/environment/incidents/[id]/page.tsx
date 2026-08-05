"use client";

import { useParams } from "next/navigation";

export default function EnvironmentIncidentsPage() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  return <div>Environment Incidents — {id}</div>;
}
