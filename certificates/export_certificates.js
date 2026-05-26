// export_certificates.js
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { parse } from 'csv-parse/sync';

const outputDir = '../public/certificates/output';
const csvFile = '../stakeholders.csv';
const assetsDir = '../public/certificates/assets';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load stakeholders from CSV
const csvData = fs.readFileSync(csvFile, 'utf8');
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

// 🔹 Ceremonial layout function
function addCeremonialLayout(doc, record) {
  const { Name, Branch, Date, Email } = record;
  const margin = 60;
  const pageWidth = 595;   // A4 width
  const pageHeight = 842;  // A4 height
  const contentWidth = pageWidth - (margin * 2);

  // Title
  doc.fontSize(26)
     .fillColor('#FFD700')
     .text('Circle of Twelve Covenant Certificate',
           margin, 120, { width: contentWidth, align: 'center' });

  // Branch identity beneath title
  doc.fontSize(20)
     .fillColor('#FFD700')
     .text(`${Branch} Chamber`,
           margin, 160, { width: contentWidth, align: 'center' });

  // Body text
  const covenantText = `Name: ${Name}\nOnboarding Date: ${Date}\nEmail: ${Email}\n\nThis certificate affirms your covenant with Angelic Triggered Solutions, sanctified by the Golden Covenant banner and the In Unity Faith seal.`;
  doc.fontSize(18)
     .fillColor('#FFD700')
     .text(covenantText, margin, 220, {
       width: contentWidth,
       align: 'justify',
       lineGap: 8
     });

  // Footer blessing
  doc.fontSize(20)
     .fillColor('#FFD700')
     .text('In Unity, Faith, and Strength',
           margin, pageHeight - 100, { width: contentWidth, align: 'center' });
}

// Generate PDF for each stakeholder
records.forEach(record => {
  const { Name, Branch, Date } = record;
  const filename = `${Name.replace(/\s+/g, '_')}_${Branch}_${Date}.pdf`;
  const filePath = path.join(outputDir, filename);

  const doc = new PDFDocument({ size: 'A4', margin: 0 });
  doc.pipe(fs.createWriteStream(filePath));

  // 🔹 Background parchment
  doc.image(path.join(assetsDir, 'parchment.png'), 0, 0, { width: 595, height: 842 });

  // 🔹 Golden frame overlay
  doc.image(path.join(assetsDir, 'Golden_Frame.png'), 0, 0, { width: 595, height: 842 });

  // 🔹 Cosmic overlay
  doc.image(path.join(assetsDir, 'Cosmic_Frame.png'), 0, 0, { width: 595, height: 842 });

  // 🔹 ATS Crest watermark (semi-transparent, diagonal)
  doc.opacity(0.15);
  doc.rotate(45, { origin: [300, 400] });
  doc.image(path.join(assetsDir, 'ATS_Crest.png'), 150, 200, { width: 300 });
  doc.rotate(-45, { origin: [300, 400] });
  doc.opacity(1);

  // 🔹 Golden Covenant banner
  doc.image(path.join(assetsDir, 'Golden_Covenant_clean.png'), 100, 80, { width: 400 });

  // 🔹 ATS Crest at top
  doc.image(path.join(assetsDir, 'ATS_Crest.png'), 250, 40, { width: 100 });

  // 🔹 Golden Star at bottom
  doc.image(path.join(assetsDir, 'golden_star_crest.png'), 250, 720, { width: 100 });

  // 🔹 In Unity Faith seal
  doc.image(path.join(assetsDir, 'In_Unity_Faith_clean.png'), 480, 40, { width: 80 });

  // 🔹 Twelve chamber crests in a row
  const chamberFiles = [
    'BANKING.png','STEEL.png','CEMENT.png','COMMUNITY.png',
    'COUNCILS.png','HOUSING.png','MINERS.png','VETERANS.png',
    'INSURANCE.png','PARTNERS.png','GOVERNMENT.png','LANDOWNERS.png'
  ];
  let x = 40;
  chamberFiles.forEach(file => {
    doc.image(path.join(assetsDir, file), x, 600, { width: 40 });
    x += 45;
  });

  // 🔹 Ceremonial text layout
  addCeremonialLayout(doc, record);

  doc.end();
  console.log(`✅ Generated with design: ${filename}`);
});
