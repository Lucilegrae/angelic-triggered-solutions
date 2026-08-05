"use client";

import { useParams } from "next/navigation";

export default function GNSSFixesPage() {
  const { id } = useParams<{ id: string }>();

  return <div>GNSS Fixes — {id}</div>;
}
