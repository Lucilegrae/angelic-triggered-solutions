#!/data/data/com.termux/files/usr/bin/bash

# Navigate to project root
cd ~/angelic-triggered-solutions/angelic-triggered-solutions

echo "Cleaning old covenant PDFs..."
rm -f ./public/certificates/output/*.pdf

echo "Generating Circle of Eleven covenants..."
node generate_certificates.js

echo "Done. New PDFs are in ./public/certificates/output/"
ls ./public/certificates/output/*.pdf

echo "Uploading to Supabase..."
node upload_certificates.js

echo "Constellation complete. PDFs archived and public URLs generated."
