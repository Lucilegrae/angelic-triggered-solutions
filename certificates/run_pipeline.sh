#!/bin/bash
# run_pipeline.sh
# Master runner for covenant certificate pipeline with Supabase ledger logging

set -e  # stop on first error

echo "🔹 Starting covenant pipeline..."

# Step 1: Generate PDFs with ceremonial design
echo "🔹 Exporting certificates..."
node export_certificates.js

# Count how many PDFs were generated
CERT_COUNT=$(ls ../public/certificates/output/*.pdf | wc -l)

# Step 2: Upload to Supabase + email stakeholders
echo "🔹 Uploading certificates..."
node upload_certificates.js

# Step 3: Copy PDFs into shared Downloads for mobile access
echo "🔹 Copying PDFs to shared storage..."
cp ../public/certificates/output/*.pdf ~/storage/downloads/

# Step 4: Log run into Supabase ledger
echo "🔹 Logging run into Supabase ledger..."
node - <<'EOF'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  const { error } = await supabase
    .from('covenant_ledger')
    .insert({
      run_timestamp: new Date().toISOString(),
      certificates_generated: process.env.CERT_COUNT,
      sanctifier: 'Prince Masvikepi'
    });

  if (error) {
    console.error("❌ Ledger logging failed:", error.message);
  } else {
    console.log("✅ Ledger entry recorded in Supabase.");
  }
})();
EOF
