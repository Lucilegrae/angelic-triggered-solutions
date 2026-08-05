import { loadPayload } from "../../loadPayload";

export default async function GovernmentDashboard({ params }) {
  const payload = await loadPayload();

  return (
    <div>
      <h1>Government Dashboard</h1>
      <p>Ministry: {params.ministry}</p>

      {payload.permissions.can_approve && (
        <div>Approval Panel Enabled</div>
      )}

      {payload.permissions.can_review && (
        <div>Review Panel Enabled</div>
      )}
    </div>
  );
}
