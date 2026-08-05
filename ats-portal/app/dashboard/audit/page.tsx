import AuditTrailFilters from "@/components/AuditTrailFilters";

export default function AuditTrailPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ATS Audit Trail Dashboard</h1>

      <AuditTrailFilters />
    </div>
  );
}
