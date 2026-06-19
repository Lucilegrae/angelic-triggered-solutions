#!/bin/bash

DATE="$1"
STAKEHOLDER="$2"
NAME="$3"
CERT_PATH="$4"
UUID="$5"
SERIAL="$6"
MEMBERSHIP="$7"
SECTOR="$8"
INS_UUID="$9"

OUT_DIR=$(dirname "$CERT_PATH")
mkdir -p "$OUT_DIR"

echo "🎨 Building certificate for $NAME ($SECTOR)"

# Route to correct template
TEMPLATE=$(./scripts/select_certificate_template.sh "$SECTOR")

if [ -z "$TEMPLATE" ]; then
  echo "⚠ No template found for sector: $SECTOR"
  exit 1
fi

# Call your existing ATS certificate generator
python3 scripts/render_certificate.py \
  --template "$TEMPLATE" \
  --name "$NAME" \
  --sector "$SECTOR" \
  --serial "$SERIAL" \
  --uuid "$UUID" \
  --ins "$INS_UUID" \
  --date "$DATE" \
  --output "$CERT_PATH"

echo "✅ Certificate generated: $CERT_PATH"
