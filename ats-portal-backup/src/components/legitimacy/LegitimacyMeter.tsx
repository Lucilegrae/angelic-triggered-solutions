"use client";
import "@/styles/legitimacy/aura.css";

export function LegitimacyMeter({ progress, stage }: { progress: number; stage: string }) {
  const auraColor =
    stage === "initiated"
      ? "var(--aura-initiated)"
      : stage === "verified"
      ? "var(--aura-verified)"
      : stage === "sanctified"
      ? "var(--aura-sanctified)"
      : "var(--aura-commissioned)";

  return (
    <div
      className="relative p-4 border rounded-lg bg-black text-white"
      style={{ "--aura": auraColor } as any}
    >
      {/* Aura Ring */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          animation: "auraRing 2.5s infinite",
          border: `2px solid ${auraColor}`,
        }}
      />

      <div className="text-lg font-bold">{stage.toUpperCase()}</div>

      <div className="w-full bg-gray-700 h-3 rounded mt-2 overflow-hidden">
        <div
          className="h-3 rounded aura-bar"
          style={{
            width: `${progress}%`,
            background: auraColor,
            animation: "auraPulse 2s infinite",
          }}
        />
      </div>

      <div className="text-sm mt-1">{progress}%</div>
    </div>
  );
}
