import { useAuthority } from "@/hooks/useIdentity";

interface AuthorityHaloProps {
  level: string;
  ministryId?: string;
  sectorId?: string;
  mode: "certificate" | "workflow";
}

export default async function AuthorityHalo({
  level,
  ministryId,
  sectorId,
  mode,
}: AuthorityHaloProps) {
  const auth = await useAuthority();

  const can =
    mode === "certificate"
      ? await auth.canIssue(level, ministryId, sectorId)
      : await auth.canApprove(ministryId, sectorId);

  const label =
    mode === "certificate"
      ? `Certificate Authority — ${level}`
      : `Workflow Authority`;

  return (
    <div
      className={
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs " +
        (can
          ? "border-yellow-400/70 bg-yellow-900/40 text-yellow-100 shadow-[0_0_20px_rgba(250,204,21,0.6)]"
          : "border-slate-600/70 bg-slate-900/70 text-slate-300")
      }
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      <span className="font-semibold">{label}</span>
      <span className="opacity-70">{can ? "active" : "inactive"}</span>
    </div>
  );
}
