import { loadPayload } from "../loadPayload";

export default async function SupplierDashboard() {
  const payload = await loadPayload();

  return (
    <div>
      <h1>Supplier Dashboard</h1>
      <p>Sector: {payload.sector}</p>

      {payload.permissions.can_supply && (
        <div>Supply Management Enabled</div>
      )}
    </div>
  );
}
