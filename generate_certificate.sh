#!/bin/bash
# Main Golden Covenant PNG generator

DATE="$1"
STAKEHOLDER="$2"
NAME="$3"
OUTPUT="$4"
UUID="$5"
SERIAL="$6"
MEMBERSHIP="$7"
SECTOR="$8"
INSIGNIA="$9"

if [ -z "$SECTOR" ]; then
  echo "❌ SECTOR is required"
  exit 1
fi

TEMPLATE=$(./scripts/select_certificate_template.sh "$SECTOR")

if [ -z "$TEMPLATE" ]; then
  echo "❌ No template found for sector: $SECTOR"
  exit 1
fi

echo "🎨 Building certificate for $NAME ($SECTOR)"

python3 scripts/render_certificate.py \
  --template "$TEMPLATE" \
  --name "$NAME" \
  --sector "$SECTOR" \
  --serial "$SERIAL" \
  --uuid "$UUID" \
  --ins "$INSIGNIA" \
  --date "$DATE" \
  --output "$OUTPUT"
