import fs from 'fs';
import puppeteer from 'puppeteer-core';

(async () => {
  // Launch Chromium
  const browser = await puppeteer.launch({
    executablePath: '/data/data/com.termux/files/usr/bin/chromium-browser',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  // Read recipients.csv
  const data = fs.readFileSync('recipients.csv', 'utf8').trim().split('\n');
  data.shift(); // remove header line

  for (const line of data) {
    const [name, branch, date] = line.split(',');

    // Load the embedded certificate template (with base64 images)
    let html = fs.readFileSync('./certificate_embedded.html', 'utf8');
    html = html.replace('[Recipient Name]', name)
               .replace('[Branch Name]', branch)
               .replace('[Onboarding Date]', date);

    // Render HTML (use domcontentloaded to avoid timeouts)
    await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 0 });

    // Export PDF
    const filename = `./public/certificates/output/${name.replace(/ /g,'_')}_${branch}_${date}.pdf`;
    await page.pdf({ path: filename, format: 'A4' });

    console.log(`Generated: ${filename}`);
  }

  await browser.close();
})();
