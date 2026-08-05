import { useSectorSLA } from "@/hooks/useSectorSLA";
import { SectorSLAChart } from "@/components/WorkflowCharts/SectorSLAChart";

export default async function SectorSLAPage() {
  const sla = await useSectorSLA();

  return (
    <div className="space-y-8 p-6">
      <SectorSLAChart data={sla} />
    </div>
  );
}
