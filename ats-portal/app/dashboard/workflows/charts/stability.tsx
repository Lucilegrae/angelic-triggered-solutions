import { useSectorStability } from "@/hooks/useSectorStability";
import { SectorStabilityChart } from "@/components/WorkflowCharts/SectorStabilityChart";

export default async function SectorStabilityPage() {
  const stability = await useSectorStability();

  return (
    <div className="space-y-8 p-6">
      <SectorStabilityChart data={stability} />
    </div>
  );
}
