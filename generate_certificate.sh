#!/bin/bash
STAKEHOLDER=$1
CERT_UUID=$2
SERIAL_NUM=$3
USER_NAME=$4

ASSET_DIR="public/certificates/assets"
OUTPUT_DIR="public/certificates/output"
LEDGER="public/certificates/archives/certificate_ledger.csv"

BASE="$ASSET_DIR/certificate_base.png"
CREST="$ASSET_DIR/ats-crest.png"
COVENANT="$ASSET_DIR/golden-covenant.png"
UNITY="$ASSET_DIR/in-unity-faith.png"
SEAL="$ASSET_DIR/eternal_preservation_seal.png"
SIGNATURE="public/assets/signatures/golden_signature_vector.png"

# Ensure output and ledger directories exist
mkdir -p "$OUTPUT_DIR"
mkdir -p "$(dirname "$LEDGER")"

# Initialize ledger if not exists
if [ ! -f "$LEDGER" ]; then
    echo "Date,Stakeholder,Name,Certificate_File,UUID,Serial_Number" > "$LEDGER"
fi

OUTPUT_FILE="$OUTPUT_DIR/certificate_${STAKEHOLDER}.png"

# Generate certificate with ImageMagick
magick "$BASE" \
    \( "$SEAL" -resize 800x800 -alpha set -channel A -evaluate Multiply 0.15 \) -gravity Center -composite \
    \( "$CREST" -resize 160x160 \) -gravity NorthWest -geometry +100+160 -composite \
    \( "$UNITY" -resize 140x160 \) -gravity NorthEast -geometry +100+160 -composite \
    \( "$COVENANT" -resize 200x200 \) -gravity Center -geometry +0+280 -composite \
    \( "$SIGNATURE" -resize 600x240 -alpha set -channel A -evaluate Multiply 1.0 \) -gravity SouthWest -geometry +180+140 -composite \
    -gravity Center -pointsize 48 -fill black -annotate +0-120 "This Certificate is Awarded To:" \
    -gravity Center -pointsize 40 -fill black -annotate +0-40 "$USER_NAME" \
    -gravity Center -pointsize 32 -fill black -annotate +0+40 "For distinguished service in $STAKEHOLDER" \
    -gravity SouthWest -pointsize 24 -fill black -annotate +120+320 "Certification UUID: $CERT_UUID" \
    -gravity SouthEast -pointsize 24 -fill black -annotate +120+300 "Serial Number: $SERIAL_NUM" \
    "$OUTPUT_FILE"

# Append issuance to ledger
echo "$(date +%Y-%m-%d),$STAKEHOLDER,$USER_NAME,$OUTPUT_FILE,$CERT_UUID,$SERIAL_NUM" >> "$LEDGER"

echo "✨ Generated: $OUTPUT_FILE with UUID $CERT_UUID and Serial $SERIAL_NUM"
