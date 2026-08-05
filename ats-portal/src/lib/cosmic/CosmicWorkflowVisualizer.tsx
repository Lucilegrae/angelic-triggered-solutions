export default function CosmicWorkflowVisualizer() {
  const steps = [
    "Ministry Review",
    "Compliance Check",
    "Mechanisation Assessment",
    "Risk Evaluation",
    "Upliftment Approval",
  ];

  return (
    <div className="workflow-visualizer">
      {steps.map((s, idx) => (
        <div key={idx} className="workflow-step">
          {s}
        </div>
      ))}
    </div>
  );
}
