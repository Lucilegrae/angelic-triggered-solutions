"use client";

import { useParams } from "next/navigation";

export default function GNSSSessionsPage() {
  const { id } = useParams<{ id: string }>();

  return <div>GNSS Session — {id}</div>;
}
