export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">ATS Ministry Federation</h1>
        <p className="text-sm text-slate-400 mt-2">
          Angelic Triggered Solutions · Production Ministry Analytics
        </p>
      </header>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="border border-slate-800 rounded-xl p-5 bg-slate-900/60">
          <h2 className="text-xl font-semibold mb-2">Portal Command</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/portal/dashboard" className="text-sky-300 hover:underline">Portal Dashboard</a></li>
            <li><a href="/portal/federation" className="text-sky-300 hover:underline">Federation Health</a></li>
            <li><a href="/portal/ministry" className="text-sky-300 hover:underline">Ministry Oversight</a></li>
            <li><a href="/portal/staff" className="text-sky-300 hover:underline">Staff & Permissions</a></li>
            <li><a href="/portal/stakeholders" className="text-sky-300 hover:underline">Stakeholders Registry</a></li>
          </ul>
        </div>

        <div className="border border-slate-800 rounded-xl p-5 bg-slate-900/60">
          <h2 className="text-xl font-semibold mb-2">Certificates & Legitimacy</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/portal/certificates" className="text-sky-300 hover:underline">Certificates Registry</a></li>
            <li><a href="/portal/certificates/issue" className="text-sky-300 hover:underline">Issue Certificates</a></li>
            <li><a href="/portal/certificates/generate" className="text-sky-300 hover:underline">Generate Batch Certificates</a></li>
            <li><a href="/verify" className="text-sky-300 hover:underline">Verify Certificate</a></li>
            <li><a href="/legitimacy" className="text-sky-300 hover:underline">Legitimacy Console</a></li>
          </ul>
        </div>

        <div className="border border-slate-800 rounded-xl p-5 bg-slate-900/60">
          <h2 className="text-xl font-semibold mb-2">GNSS & Field Intelligence</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/portal/gnss" className="text-sky-300 hover:underline">GNSS Overview</a></li>
            <li><a href="/portal/gnss/fusion" className="text-sky-300 hover:underline">GNSS Fusion Console</a></li>
            <li><a href="/dashboard/gnss" className="text-sky-300 hover:underline">GNSS Dashboard</a></li>
            <li><a href="/ministry/gnss-block-pressure" className="text-sky-300 hover:underline">GNSS Block Pressure</a></li>
            <li><a href="/ministry/gnss-risk-pressure" className="text-sky-300 hover:underline">GNSS Risk Pressure</a></li>
          </ul>
        </div>

        <div className="border border-slate-800 rounded-xl p-5 bg-slate-900/60">
          <h2 className="text-xl font-semibold mb-2">Procurement & Treasury</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/portal/procurement" className="text-sky-300 hover:underline">Procurement Overview</a></li>
            <li><a href="/portal/procurement/analytics" className="text-sky-300 hover:underline">Procurement Analytics</a></li>
            <li><a href="/portal/ledger" className="text-sky-300 hover:underline">Ledger Command</a></li>
            <li><a href="/portal/ledger/treasury" className="text-sky-300 hover:underline">Treasury Console</a></li>
            <li><a href="/portal/ledger/liquidity" className="text-sky-300 hover:underline">Liquidity & Stress</a></li>
          </ul>
        </div>

        <div className="border border-slate-800 rounded-xl p-5 bg-slate-900/60">
          <h2 className="text-xl font-semibold mb-2">Insurance & Risk</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/portal/insurance" className="text-sky-300 hover:underline">Insurance Overview</a></li>
            <li><a href="/portal/insurance/analytics" className="text-sky-300 hover:underline">Insurance Analytics</a></li>
            <li><a href="/ministry/risk-clusters" className="text-sky-300 hover:underline">Risk Clusters</a></li>
            <li><a href="/portal/environment" className="text-sky-300 hover:underline">Environment & ESG</a></li>
            <li><a href="/dashboard/risk" className="text-sky-300 hover:underline">Risk Dashboard</a></li>
          </ul>
        </div>

        <div className="border border-slate-800 rounded-xl p-5 bg-slate-900/60">
          <h2 className="text-xl font-semibold mb-2">Workflows & Automation</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/dashboard/workflows" className="text-sky-300 hover:underline">Workflow Dashboard</a></li>
            <li><a href="/portal/workflow/timeline" className="text-sky-300 hover:underline">Workflow Timeline</a></li>
            <li><a href="/portal/workflow/heatmap" className="text-sky-300 hover:underline">Workflow Heatmap</a></li>
            <li><a href="/ministry/automation" className="text-sky-300 hover:underline">Ministry Automation</a></li>
            <li><a href="/portal/allocation" className="text-sky-300 hover:underline">Allocation Engine</a></li>
          </ul>
        </div>
      </section>

      <footer className="mt-10 text-xs text-slate-500">
        ATS-Infinity Omniversal Command System · Operational Homepage
      </footer>
    </main>
  );
}
