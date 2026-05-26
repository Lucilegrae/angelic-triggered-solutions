#!/bin/bash
CREST_DIR=~/angelic-triggered-solutions/angelic-triggered-solutions/public/images/crests

declare -a CRESTS=(
  "banking_crest.png"
  "insurance_policy_crest.png"
  "veterans_crest.png"
  "miners_crest.png"
  "housing_members_crest.png"
  "community_crest.png"
  "councils_crest.png"
  "landowners_crest.png"
  "cement_crest.png"
  "steel_crest.png"
  "government_crest.png"
  "private_partners_crest.png"
)

echo "🔹 Ceremonial Crest Verification Log"
echo "-----------------------------------"

for crest in "${CRESTS[@]}"; do
  if [ -f "$CREST_DIR/$crest" ]; then
    echo "✅ $crest sanctified and present."
  else
    echo "⚠️ $crest missing or not yet converted."
  fi
done

echo "-----------------------------------"
echo "✨ Verification complete."
