import React from 'react'
import { exportAuditPDF } from '../utils/exportAuditPDF'

export default function AuditExportButton({ records }) {
  return (
    <button onClick={() => exportAuditPDF(records)}>
      Export Audit Scroll (PDF)
    </button>
  )
}
