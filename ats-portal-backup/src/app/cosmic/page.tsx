import CosmicAllocationDashboard from "@/components/ats/allocation/cosmic/CosmicAllocationDashboard";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Cosmic Allocation Dashboard</h1>
      <CosmicAllocationDashboard />
    </div>
  );
}
