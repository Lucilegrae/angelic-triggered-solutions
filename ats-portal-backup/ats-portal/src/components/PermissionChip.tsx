import { usePermissions } from "@/hooks/useIdentity";

interface PermissionChipProps {
  slug: string;
  label?: string;
}

export default async function PermissionChip({ slug, label }: PermissionChipProps) {
  const { has } = await usePermissions();
  const allowed = has(slug);

  return (
    <span
      className={
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] " +
        (allowed
          ? "border-emerald-500/70 bg-emerald-900/60 text-emerald-100"
          : "border-rose-500/70 bg-rose-900/60 text-rose-100")
      }
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      <span className="uppercase tracking-wide">
        {label ?? slug}
      </span>
      <span className="opacity-70">
        {allowed ? "granted" : "denied"}
      </span>
    </span>
  );
}
