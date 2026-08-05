import { usePermissions } from "@/hooks/useIdentity";

export default async function AccessGrid() {
  const { list, has } = await usePermissions();

  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl border border-cyan-500/50 bg-slate-900/70 p-4">
      {list.map((perm: string, idx: number) => (
        <div
          key={idx}
          className={
            "flex items-center justify-between rounded-lg px-3 py-2 text-xs " +
            (has(perm)
              ? "bg-cyan-800/40 text-cyan-200 border border-cyan-500/40"
              : "bg-slate-800/40 text-slate-400 border border-slate-600/40")
          }
        >
          <span className="uppercase tracking-wide">{perm}</span>
          <span className="text-[10px] opacity-70">
            {has(perm) ? "granted" : "denied"}
          </span>
        </div>
      ))}
    </div>
  );
}
