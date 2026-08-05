import { useIdentity } from "@/hooks/useIdentity";

export default async function AccessBanner() {
  const { roles, permissions } = await useIdentity();

  return (
    <div className="w-full rounded-xl border border-indigo-500/50 bg-slate-900/70 px-6 py-4 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
      <div className="text-indigo-300 font-bold text-lg">
        ATS Access Profile
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {roles.map((r: any, idx: number) => (
          <span
            key={idx}
            className="rounded-full bg-indigo-700/60 px-3 py-1 text-[11px] uppercase tracking-wide text-indigo-100"
          >
            {r.role_code}
          </span>
        ))}
      </div>

      <div className="mt-4 text-indigo-200 text-sm opacity-80">
        Permissions: {permissions.length}
      </div>
    </div>
  );
}
