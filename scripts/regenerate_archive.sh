#!/bin/bash
set -e

echo "🔧 Starting full archive regeneration..."

# Step 1: Rebuild Master CSV
bash generate_archive_index.sh

# Step 2: Rebuild Stakeholder Pages
bash generate_stakeholder_pages.sh

# Step 3: Rebuild Global Dashboard + Booklet
bash generate_stakeholder_dashboard.sh

echo "✨ Full archive regeneration complete — all indexes, dashboards, and booklets updated."

# --- Export stats for GitHub Actions notifications ---
MASTER_CSV="public/certificates/archives/master_ledger.csv"

TOTAL_CERTS=$(tail -n +2 "$MASTER_CSV" | wc -l)
TOTAL_STAKEHOLDERS=$(tail -n +2 "$MASTER_CSV" | cut -d',' -f2 | sort -u | wc -l)
TOTAL_BATCHES=$(tail -n +2 "$MASTER_CSV" | cut -d',' -f6 | sort -u | wc -l)

# If running inside GitHub Actions, $GITHUB_ENV exists.
# If running locally, mock it with .github_env_test
if [ -z "$GITHUB_ENV" ]; then
  GITHUB_ENV="$(pwd)/.github_env_test"
fi

echo "TOTAL_CERTS=$TOTAL_CERTS" >> $GITHUB_ENV
echo "TOTAL_STAKEHOLDERS=$TOTAL_STAKEHOLDERS" >> $GITHUB_ENV
echo "TOTAL_BATCHES=$TOTAL_BATCHES" >> $GITHUB_ENV

echo "✨ Stats exported: Certificates=$TOTAL_CERTS, Stakeholders=$TOTAL_STAKEHOLDERS, Batches=$TOTAL_BATCHES"
