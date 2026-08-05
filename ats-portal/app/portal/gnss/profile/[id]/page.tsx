"use client";

import { useParams } from "next/navigation";

export default function GNSSProfilePage() {
  const { id } = useParams<{ id: string }>();

  return <div>GNSS Profile — {id}</div>;
}
