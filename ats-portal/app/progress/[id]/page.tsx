"use client";

import { useParams } from "next/navigation";
import GoldenStar from "@/components/GoldenStar";

export default function ProgressPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-2xl font-semibold">
        Golden Star Covenant Trail
      </h1>

      <p className="mt-2 text-xs text-slate-400">
        Tracking your ceremonial legitimacy journey
      </p>

      <div className="mt-10">
        <GoldenStar enrolmentId={id} />
      </div>
    </main>
  );
}
