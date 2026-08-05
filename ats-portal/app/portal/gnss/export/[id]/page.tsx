"use client";

import { useParams } from "next/navigation";

export default function GNSSExportPage() {
  const { id } = useParams<{ id: string }>();

  return <div>GNSS Export — {id}</div>;
}
