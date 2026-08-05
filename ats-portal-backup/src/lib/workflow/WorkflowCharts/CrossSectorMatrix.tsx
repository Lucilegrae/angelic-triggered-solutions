"use client";

export function CrossSectorMatrix({ data }: { data: any[] }) {
  const sectors = Array.from(
    new Set([
      ...data.map((d) => d.from_sector),
      ...data.map((d) => d.to_sector),
    ])
  ).sort();

  function intensity(count: number) {
    if (count > 50) return "bg-green-500";
    if (count > 20) return "bg-yellow-500";
    if (count > 10) return "bg-orange-500";
    if (count > 0)  return "bg-red-500";
    return "bg-slate-800";
  }

  return (
    <div className="rounded-xl bg-slate-900/70 p-6 border border-purple-500/40">
      <div className="text-purple-300 font-bold text-xl mb-4">
        Cross‑Sector Influence Matrix
      </div>

      <div className="overflow-auto">
        <table className="min-w-max border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-slate-300">From → To</th>
              {sectors.map((s) => (
                <th key={s} className="p-2 text-slate-300">{s}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {sectors.map((from) => (
              <tr key={from}>
                <td className="p-2 text-slate-300 font-semibold">{from}</td>

                {sectors.map((to) => {
                  const entry = data.find(
                    (d) => d.from_sector === from && d.to_sector === to
                  );
                  const count = entry ? entry.count : 0;

                  return (
                    <td
                      key={to}
                      className={`p-2 text-center text-white ${intensity(count)}`}
                    >
                      {count}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
