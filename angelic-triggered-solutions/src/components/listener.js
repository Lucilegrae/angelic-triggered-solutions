import { createClient } from '@supabase/supabase-js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// 🔔 Listen for new certifications
supabase.channel('certificate_channel')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'certifications' }, payload => {
    generateCertificatePDF(payload.new);
  })
  .subscribe();

async function generateCertificatePDF(cert) {
  const doc = new PDFDocument({ size: 'A4' });
  const filePath = `./certificates/${cert.certificate_number}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  // 🌌 Cosmic Background
  doc.image('./public/constellations/starfield.png', 0, 0, {
    width: doc.page.width,
    height: doc.page.height
  });

  // 📜 Parchment Overlay
  doc.image('./public/constellations/parchment-overlay.png', 0, 0, {
    width: doc.page.width,
    height: doc.page.height
  });

  // 🌀 Scroll-Aura Border
  doc.image('./public/constellations/scroll-aura-border.png', 0, 0, {
    width: doc.page.width,
    height: doc.page.height
  });

  // 🌟 Golden Star Crest Watermark
  doc.opacity(0.15);
  doc.image('./public/constellations/golden-star-crest.png',
    doc.page.width / 2 - 150,
    doc.page.height / 2 - 150,
    { width: 300, height: 300 }
  );
  doc.opacity(1);

  // 🔱 Top Banner
  doc.moveDown(2);
  doc.image('./public/banners/golden-covenant.png', { fit: [500, 150], align: 'center' });
  doc.moveDown(2);

  // 🛡️ ATS Crest
  doc.image('./public/banners/ats-crest.png', { fit: [120, 120], align: 'center' });
  doc.moveDown(2);

  // 🔄 Rotating Branch Crest + Legend
  const branchCrests = [
    { path: './public/banners/flame-crest.png', legend: 'Flame Crest — Symbol of passion, renewal, and transformative energy.' },
    { path: './public/banners/river-crest.png', legend: 'River Crest — Symbol of flow, continuity, and collective strength.' },
    { path: './public/banners/stone-crest.png', legend: 'Stone Crest — Symbol of resilience, endurance, and covenantal stability.' },
    { path: './public/banners/celestial-crest.png', legend: 'Celestial Crest — Symbol of guidance, vision, and cosmic unity.' },
    { path: './public/banners/ouroboros-crest.png', legend: 'Ouroboros Crest — Symbol of eternal cycles, rebirth, and covenantal renewal.' }
  ];
  const chosen = branchCrests[Math.floor(Math.random() * branchCrests.length)];

  doc.image(chosen.path, { fit: [100, 100], align: 'center' });
  doc.moveDown();
  doc.fontSize(12).italic().fillColor('#FFD700').text(chosen.legend, { align: 'center' });
  doc.moveDown(2);

  // 📜 Certificate Details
  doc.fontSize(16).fillColor('#000000').text(`Certificate Number: ${cert.certificate_number}`, { align: 'right' });
  doc.text(`Issued At: ${cert.issued_at}`, { align: 'left' });
  doc.text(`Valid Until: ${cert.valid_until}`, { align: 'left' });
  doc.moveDown();

  doc.fontSize(18).fillColor('#000000').text(`Affiliation: ${cert.crest_affiliation}`, { align: 'center' });
  doc.moveDown();

  // ✨ Affirmation
  doc.fontSize(14).italic().fillColor('#FFD700').text(
    '“By covenant and crest, unity is affirmed. The Golden Star shines through you.”',
    { align: 'center' }
  );

  // 🕊️ Footer Banner
  doc.moveDown(2);
  doc.image('./public/banners/unity-faith.png', { fit: [400, 100], align: 'center' });
  doc.moveDown();
  doc.text('Authorized by Angelic Triggered Solutions (ATS)', { align: 'center' });

  doc.end();

  // 📤 Upload to Supabase Storage
  doc.on('finish', async () => {
    const fileBuffer = fs.readFileSync(filePath);

    const { error } = await supabase.storage
      .from('certificates')
      .upload(`${cert.certificate_number}.pdf`, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (error) {
      console.error('Upload failed:', error.message);
    } else {
      console.log(`Certificate uploaded: ${cert.certificate_number}.pdf`);
      logCertificate(cert, chosen);
    }
  });
}

// 🗂️ Lineage Log Writer
function logCertificate(cert, chosen) {
  const logDir = './logs';
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logPath = path.resolve(`${logDir}/certification.log`);

  const blessings = [
    "The crest shines eternal, binding unity in golden light.",
    "Through covenant, the star guides lineage into harmony.",
    "Faith and flame entwine, sanctifying the bearer of the crest.",
    "Stone and river flow together, affirming covenantal strength.",
    "Celestial paths illuminate the covenant’s enduring promise."
  ];
  const blessing = blessings[Math.floor(Math.random() * blessings.length)];

  const entry = `[${new Date().toISOString()}] Issued certificate ${cert.certificate_number} for ${cert.crest_affiliation} — Crest: ${path.basename(chosen.path)} — ${chosen.legend} — ${blessing}\n`;

  fs.appendFileSync(logPath, entry);
  console.log(`Lineage log updated: ${logPath}`);
}
