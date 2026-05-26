import { jsPDF } from 'jspdf'

export function exportAuditPDF(records) {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text('Lineage Audit Scroll', 20, 20)

  records.forEach((r, i) => {
    doc.text(`${r.branch} | ${r.blessing} | ${r.action} | ${r.created_at}`, 20, 40 + i * 10)
  })

  doc.save('lineage_audit_scroll.pdf')
}
