import { useIdentity } from "@/hooks/useIdentity";

export default async function IdentityBadge() {
  const { roles } = await useIdentity();

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/60 bg-slate-900/80 px-3 py-1 text-xs text-sky-100">
      <span className="font-semibold text-sky-300">Identity</span>
      <span className="h-1 w-1 rounded-full bg-sky-400" />
      <span className="flex flex-wrap gap-1">
        {roles?.map((r: any, idx: number) => (
          <span
            key={idx}
            className="rounded-full bg-sky-700/60 px-2 py-0.5 text-[10px] uppercase tracking-wide"
          >
            {r.role_code}
          </span>
        )) ?? (
          <span className="text-slate-400">No roles bound</span>
        )}
      </span>
    </div>
  );
}
