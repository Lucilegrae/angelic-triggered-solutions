import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { parse } from 'csv-parse/sync';

const supabaseUrl = 'https://wtifrlhiyzudgppqswzw.supabase.co';
const supabaseKey = 'sb_secret_S2bOjJbirRNvqiMnlljV7A_xrXWuPqP';
const bucketName = 'certificates';

const supabase = createClient(supabaseUrl, supabaseKey);

// Absolute path resolution for CSV
const csvFile = path.resolve('../stakeholders.csv');
const outputDir = path.resolve('../public/certificates/output');

// Load stakeholder records from CSV
const csvData = fs.readFileSync(csvFile, 'utf8');
const records = parse(csvData, {
  columns: true,
  skip_empty_lines: true
});

// Configure Yahoo SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  secure: true,
  auth: {
    user: 'pnovontony@yahoo.com',
    pass: 'qtacomwncgawgmtu' // Yahoo app password
  }
});

(async () => {
  for (const record of records) {
    const { Name, Branch, Date, Email } = record;

    const filename = `${Name.replace(/ /g,'_')}_${Branch}_${Date}.pdf`;
    const filePath = path.join(outputDir, filename);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Certificate file not found: ${filePath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);

    // Upload to Supabase
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(`covenants/${filename}`, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) {
      console.error(`❌ Failed to upload ${filename}:`, uploadError.message);
      continue;
    }

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(`covenants/${filename}`);

    console.log(`✅ Uploaded: ${filename}`);
    console.log(`🔗 Public URL: ${data.publicUrl}\n`);

    // Send personalized email with link + attachment
    const mailOptions = {
      from: 'pnovontony@yahoo.com',
      to: Email,
      subject: `Your Covenant Certificate - ${Branch}`,
      text: `Dear ${Name},

Your covenant certificate for the ${Branch} chamber (onboarding date: ${Date}) has been generated.

You can access it directly here:
${data.publicUrl}

For your convenience, the PDF is also attached to this email.

Blessings,
Angelic Triggered Solutions`,
      attachments: [
        {
          filename,
          path: filePath
        }
      ]
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`📧 Email sent to ${Email}: ${info.response}`);

      // Log into Supabase ledger
      const { error: logError } = await supabase
        .from('email_log')
        .insert([
          {
            name: Name,
            branch: Branch,
            date: Date,
            email: Email,
            pdf_url: data.publicUrl,
            status: 'sent',
            sent_at: new Date().toISOString()
          }
        ]);

      if (logError) {
        console.error(`❌ Failed to log email for ${Email}:`, logError.message);
      } else {
        console.log(`📝 Logged email for ${Email}`);
      }
    } catch (err) {
      console.error(`❌ Email to ${Email} failed:`, err.message);

      await supabase.from('email_log').insert([
        {
          name: Name,
          branch: Branch,
          date: Date,
          email: Email,
          pdf_url: data.publicUrl,
          status: 'failed',
          sent_at: new Date().toISOString()
        }
      ]);
    }
  }
})();
