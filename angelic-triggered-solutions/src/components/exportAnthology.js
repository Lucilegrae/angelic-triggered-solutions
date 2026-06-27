import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export function exportAnthology() {
  const logPath = './logs/certification.log';
  const anthologyPath = './anthology/lineage-anthology.pdf';

  if (!fs.existsSync(logPath)) {
    console.error('No lineage log found.');
    return;
  }

  if (!fs.existsSync('./anthology')) {
    fs.mkdirSync('./anthology');
  }

  const doc = new PDFDocument({ size: 'A4' });
  doc.pipe(fs.createWriteStream(anthologyPath));

  // 🌌 Background
  doc.image('./public/constellations/starfield.png', 0, 0, {
    width: doc.page.width,
    height: doc.page.height
  });
  doc.image('./public/constellations/parchment-overlay.png', 0, 0, {
    width: doc.page.width,
    height: doc.page.height
  });
  doc.image('./public/constellations/scroll-aura-border.png', 0, 0, {
    width: doc.page.width,
    height: doc.page.height
  });

  // 🌟 Title
  doc.moveDown(4);
  doc.fontSize(28).fillColor('#FFD700').text('Lineage Anthology of Onboarding Certificates', { align: 'center' });
  doc.moveDown(2);

  // 📖 Read lineage log entries
  const entries = fs.readFileSync(logPath, 'utf-8').split('\n').filter(Boolean);

  entries.forEach(entry => {
    doc.fontSize(12).fillColor('#000000').text(entry, { align: 'left' });
    doc.moveDown(1);
  });

  // ✨ Closing Affirmation
  doc.moveDown(3);
  doc.fontSize(14).italic().fillColor('#FFD700').text(
    '“This anthology sanctifies the covenantal journey, affirming unity across all crests and generations.”',
    { align: 'center' }
  );

  doc.end();
  console.log(`✅ Anthology exported: ${anthologyPath}`);
}
