import { useSectorRecovery } from "@/hooks/useSectorRecovery";
import { SectorRecoveryChart } from "@/components/WorkflowCharts/SectorRecoveryChart";

export default async function SectorRecoveryPage() {
  const recovery = await useSectorRecovery();

  return (
    <div className="space-y-8 p-6">
      <SectorRecoveryChart data={recovery} />
    </div>
  );
}
