"use client";

import { useParams } from "next/navigation";

export default function GNSSBaselinesPage() {
  const { id } = useParams<{ id: string }>();

  return <div>GNSS Baselines — {id}</div>;
}
