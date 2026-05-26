import fs from 'fs';
import path from 'path';

// Paths
const templatePath = './certificate_template.html';
const outputPath   = './certificate_embedded.html';
const base64Dir    = './base64_crests';

// Load template
let html = fs.readFileSync(templatePath, 'utf8');

// Map crest names to base64 files
const crestMap = {
  'banking_crest.png': 'banking_crest.txt',
  'veterans_crest.png': 'veterans_crest.txt',
  'miners_crest.png': 'miners_crest.txt',
  'housing_members_crest.png': 'housing_members_crest.txt',
  'landowners_crest.png': 'landowners_crest.txt',
  'cement_crest.png': 'cement_crest.txt',
  'steel_crest.png': 'steel_crest.txt',
  'government_crest.png': 'government_crest.txt',
  'private_partners_crest.png': 'private_partners_crest.txt',
  'community_crest.png': 'community_crest.txt',
  'councils_crest.png': 'councils_crest.txt',
  'insurance_policy_crest.png': 'insurance_policy_crest.txt',
  'golden_star_crest.png': 'golden_star_crest.txt'
};

// Replace <img src="..."> with base64
for (const [png, txt] of Object.entries(crestMap)) {
  const filePath = path.join(base64Dir, txt);
  if (fs.existsSync(filePath)) {
    const base64 = fs.readFileSync(filePath, 'utf8').trim();
    const dataUri = `data:image/png;base64,${base64}`;
    html = html.replace(new RegExp(`src=".*${png}"`, 'g'), `src="${dataUri}"`);
  }
}

// Save new HTML
fs.writeFileSync(outputPath, html, 'utf8');
console.log(`✅ Injected base64 images into ${outputPath}`);
