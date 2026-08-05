import { useIdentity } from "@/hooks/useIdentity";

export default async function AccessMinistryBadge() {
  const { roles } = await useIdentity();

  const scoped = roles.filter((r: any) => r.ministry_id || r.sector_id);

  return (
    <div className="flex flex-wrap gap-2">
      {scoped.map((r: any, idx: number) => (
        <span
          key={idx}
          className="rounded-full border border-purple-500/60 bg-purple-900/50 px-3 py-1 text-[11px] text-purple-200"
        >
          {r.ministry_id ? `Ministry ${r.ministry_id}` : ""}
          {r.sector_id ? ` / Sector ${r.sector_id}` : ""}
        </span>
      ))}
    </div>
  );
}
