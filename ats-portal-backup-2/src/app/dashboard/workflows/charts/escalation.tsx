import { useWorkflowEscalation } from "@/hooks/useWorkflowEscalation";
import { WorkflowEscalationPanel } from "@/components/WorkflowCharts/WorkflowEscalationPanel";

export default async function WorkflowEscalationPage() {
  const items = await useWorkflowEscalation();

  return (
    <div className="space-y-8 p-6">
      <WorkflowEscalationPanel items={items} />
    </div>
  );
}
