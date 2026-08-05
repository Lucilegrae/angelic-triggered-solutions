import { useWorkflowSLAAlerts } from "@/hooks/useWorkflowSLAAlerts";
import { SLAAlertsPanel } from "@/components/WorkflowCharts/SLAAlertsPanel";

export default async function SLAAlertsPage() {
  const alerts = await useWorkflowSLAAlerts();

  return (
    <div className="space-y-8 p-6">
      <SLAAlertsPanel alerts={alerts} />
    </div>
  );
}
