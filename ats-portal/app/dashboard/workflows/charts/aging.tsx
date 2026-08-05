import { useSectorAging } from "@/hooks/useSectorAging";
import { SectorAgingCurve } from "@/components/WorkflowCharts/SectorAgingCurve";

export default async function SectorAgingPage() {
  const aging = await useSectorAging();

  return (
    <div className="space-y-8 p-6">
      <SectorAgingCurve data={aging} />
    </div>
  );
}
