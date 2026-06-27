#!/bin/bash
# Master orchestration for sanctified certificate pipeline with logging

LOGFILE="pipeline.log"

# Redirect all output to both console and log file
exec > >(tee -a "$LOGFILE") 2>&1

echo "🕊️ Beginning ceremonial pipeline at $(date)"

# Step 1: Clean output chamber
./clean_output.sh

# Step 2: Verify sanctified assets
./verify_assets.sh || { echo "❌ Verification failed. Ritual halted."; exit 1; }

# Step 3: Generate certificates
./generate_certificate.sh

# Step 4: Zip all certificates for distribution
./zip_certificates.sh

# Step 5: Archive the batch into dated chamber
./copy_to_archive.sh

echo "✨ Ritual complete at $(date)"
