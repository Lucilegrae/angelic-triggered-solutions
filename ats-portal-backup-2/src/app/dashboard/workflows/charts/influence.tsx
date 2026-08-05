import { useSectorInfluence } from "@/hooks/useSectorInfluence";
import { SectorInfluenceGraph } from "@/components/WorkflowCharts/SectorInfluenceGraph";

export default async function SectorInfluencePage() {
  const influence = await useSectorInfluence();

  return (
    <div className="space-y-8 p-6">
      <SectorInfluenceGraph data={influence} />
    </div>
  );
}
