import { useSectorDependencies } from "@/hooks/useSectorDependencies";
import { SectorDependencyGraph } from "@/components/WorkflowCharts/SectorDependencyGraph";

export default async function SectorDependencyPage() {
  const deps = await useSectorDependencies();

  return (
    <div className="space-y-8 p-6">
      <SectorDependencyGraph data={deps} />
    </div>
  );
}
