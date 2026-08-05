"use client";

import { useCompliancePdfs } from "@/hooks/api/compliance/useCompliancePdfs";
import type { ListCompliancePdfsArgs } from "@/types/supabase/rpc";

export default function CompliancePdfList({ ministry_id }: { ministry_id: string }) {
  const { call, loading, pdfs, error } = useCompliancePdfs();

  async function load() {
    const args: ListCompliancePdfsArgs = { ministry_id };
    call(args);
  }

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">📄 Compliance PDFs</h3>

      <button onClick={load} className="ats-button" disabled={loading}>
        {loading ? "Loading..." : "Load PDFs"}
      </button>

      {error && <p className="error-text">{error}</p>}
      {pdfs && (
        <ul className="ats-list">
          {pdfs.map((p) => (
            <li key={p.id}>{p.filename}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
