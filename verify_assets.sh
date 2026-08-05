#!/bin/bash
# Verify base templates and core assets

TEMPLATES_DIR="public/certificates/archives/federation-master/certificates"

REQUIRED_TEMPLATES=(
  "certificate_GOVERNMENT.png"
  "certificate_BANKING.png"
  "certificate_COMMUNITY.png"
  "certificate_COUNCILS.png"
  "certificate_VETERANS.png"
  "certificate_STEEL.png"
  "certificate_PARTNERS.png"
  "certificate_INSURANCE.png"
  "certificate_MINERS.png"
)

MISSING=0

for tpl in "${REQUIRED_TEMPLATES[@]}"; do
  if [ ! -f "$TEMPLATES_DIR/$tpl" ]; then
    echo "❌ Missing template: $TEMPLATES_DIR/$tpl"
    MISSING=1
  fi
done

if ! command -v python3 >/dev/null 2>&1; then
  echo "❌ python3 not found"
  MISSING=1
fi

if [ $MISSING -ne 0 ]; then
  echo "❌ Asset verification failed."
  exit 1
fi

echo "✅ Assets verified at $(date)"
