#!/bin/bash
LOGFILE="pipeline.log"
exec > >(tee -a "$LOGFILE") 2>&1

echo "🕊️ Beginning ceremonial pipeline at $(date)"

./clean_output.sh
./verify_assets.sh || { echo "❌ Verification failed. Ritual halted."; exit 1; }

# Example metadata (later you can make this dynamic)
DATE="2026-07-11"
STAKEHOLDER="Government"
NAME="Prince Masvikepi"
OUTPUT="public/certificates/output/pipeline_certificate.png"
UUID="UUID-PIPE-001"
SERIAL="SERIAL-PIPE-001"
MEMBERSHIP="MEMBERSHIP-PIPE-001"
SECTOR="GOVERNMENT"
INSIGNIA="INSIGNIA-PIPE-001"

./generate_certificate.sh \
  "$DATE" \
  "$STAKEHOLDER" \
  "$NAME" \
  "$OUTPUT" \
  "$UUID" \
  "$SERIAL" \
  "$MEMBERSHIP" \
  "$SECTOR" \
  "$INSIGNIA"

./zip_certificates.sh
./copy_to_archive.sh

echo "✨ Ritual complete at $(date)"
