import { useSectorDecay } from "@/hooks/useSectorDecay";
import { SectorDecayChart } from "@/components/WorkflowCharts/SectorDecayChart";

export default async function SectorDecayPage() {
  const decay = await useSectorDecay();

  return (
    <div className="space-y-8 p-6">
      <SectorDecayChart data={decay} />
    </div>
  );
}
