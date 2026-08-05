"use client";

import { useParams } from "next/navigation";

export default function EnvironmentProfilePage() {
  const { id } = useParams<{ id: string }>();

  return <div>Environment Profile — {id}</div>;
}
