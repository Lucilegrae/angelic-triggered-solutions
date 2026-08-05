import Link from "next/link";

const roles = [
  { key: "community", label: "Community" },
  { key: "miner", label: "Miner" },
  { key: "bank", label: "Bank" },
  { key: "investor", label: "Investor" },
  { key: "government", label: "Government" },
  { key: "suppliers", label: "Suppliers" },
  { key: "transport", label: "Transport" },
  { key: "donors", label: "Donors" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-slate-950 text-slate-100 px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          ATS Stakeholder Gateway
        </h1>
        <p className="mt-4 max-w-xl text-sm text-slate-300">
          Enrol into the Angelic Triggered Solutions covenant and join the
          sunflower continuum.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {roles.map((r) => (
          <Link
            key={r.key}
            href={`/enrol/${r.key}`}
            className="border border-slate-700 rounded-xl p-4 hover:border-emerald-400 transition"
          >
            <h2 className="text-xl font-semibold">{r.label}</h2>
            <p className="mt-2 text-xs text-slate-400">
              Begin the {r.label.toLowerCase()} legitimacy journey.
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/login"
        className="mt-6 text-xs text-emerald-300 underline underline-offset-4"
      >
        Admin / Steward login
      </Link>
    </main>
  );
}
