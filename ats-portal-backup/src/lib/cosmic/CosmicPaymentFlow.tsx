export default function CosmicPaymentFlow() {
  const steps = [
    "Initiation",
    "Verification",
    "Callback",
    "Ledger Update",
  ];

  return (
    <div className="payment-flow">
      {steps.map((s, idx) => (
        <div key={idx} className="payment-node">
          {s}
        </div>
      ))}
    </div>
  );
}
