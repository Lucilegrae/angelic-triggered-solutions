"use client";

import { useParams } from "next/navigation";

export default function GNSSRoverPage() {
  const { id } = useParams<{ id: string }>();

  return <div>GNSS Rover — {id}</div>;
}
