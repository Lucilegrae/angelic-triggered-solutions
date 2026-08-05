import { useSectorResilience } from "@/hooks/useSectorResilience";
import { SectorResilienceChart } from "@/components/WorkflowCharts/SectorResilienceChart";

export default async function SectorResiliencePage() {
  const resilience = await useSectorResilience();

  return (
    <div className="space-y-8 p-6">
      <SectorResilienceChart data={resilience} />
    </div>
  );
}
