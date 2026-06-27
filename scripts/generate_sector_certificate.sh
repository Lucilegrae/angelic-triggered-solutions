#!/bin/bash
# ---------------------------------------------------------
# ATS Federation — Sector Certificate Generator (Enhanced)
# Author: Prince Masvikepi (Angelic Triggered Solutions)
# ---------------------------------------------------------

STAKEHOLDER=$1
USER_NAME=$2

if [ -z "$STAKEHOLDER" ] || [ -z "$USER_NAME" ]; then
  echo "Usage: $0 <stakeholder> <name>"
  exit 1
fi

ASSET_DIR="public/certificates/assets"
OUTPUT_DIR="public/certificates/output"
ARCHIVE_DIR="public/certificates/archives"
COUNTER_DIR="$ARCHIVE_DIR/counters"
INS_PROFILE_DIR="public/certificates/insurance/profiles"
LEDGER="$ARCHIVE_DIR/certificate_ledger.csv"

mkdir -p "$OUTPUT_DIR" "$ARCHIVE_DIR" "$COUNTER_DIR" "$INS_PROFILE_DIR"

# ---------------------------------------------------------
# Auto-generate UUIDs
# ---------------------------------------------------------
CERT_UUID=$(uuidgen)
SERIAL_NUM="ATS-$(date +%Y%m%d)-$(openssl rand -hex 3 | tr 'a-f' 'A-F')"
INS_UUID="INS-UUID-$(uuidgen | cut -d'-' -f1)"
ISSUED_AT=$(date +%Y-%m-%d)

# ---------------------------------------------------------
# Create insurance profile
# ---------------------------------------------------------
INS_PROFILE_FILE="$INS_PROFILE_DIR/${INS_UUID}.json"

cat > "$INS_PROFILE_FILE" <<EOF
{
  "ins_uuid": "$INS_UUID",
  "name": "$USER_NAME",
  "policy_number": "PENDING",
  "policy_company": "PENDING",
  "beneficiaries": [],
  "id_number": "PENDING",
  "address": "PENDING",
  "phone": "PENDING",
  "subscription_amount": 0,
  "currency": "USD",
  "registered_at": "$ISSUED_AT",
  "insured_amount": 0,
  "pension_maturity_date": "PENDING",
  "status": "Uninitialized",
  "upgrades": [],
  "downgrades": []
}
EOF

echo "🛡 Insurance profile created: $INS_PROFILE_FILE"

# ---------------------------------------------------------
# Load assets
# ---------------------------------------------------------
BASE="$ASSET_DIR/certificate_base.png"
COVENANT="$ASSET_DIR/golden-covenant.png"
UNITY="$ASSET_DIR/in-unity-faith.png"
SIGNATURE="public/assets/signatures/golden_signature_vector.png"

FED_BASE="$ASSET_DIR/federation-seals"
SEAL="$FED_BASE/corporate/ats-seal.jpeg"
AUTHORITY="$FED_BASE/authority/federation-authority-seal.jpeg"
PVT="$FED_BASE/corporate/pvt-ltd-crest.jpeg"
AUTH_SEAL="$FED_BASE/authentication/authentication-seal.jpeg"

# ---------------------------------------------------------
# Normalize stakeholder → sector key
# ---------------------------------------------------------
SECTOR_KEY=$(echo "$STAKEHOLDER" | tr 'A-Z' 'a-z' | sed 's/ /-/g')-sector

CREST=$(find "$FED_BASE" -type f -iname "${SECTOR_KEY}.*" | head -n 1)
if [ -z "$CREST" ]; then
  echo "❌ No crest found for sector: $STAKEHOLDER"
  exit 1
fi

# ---------------------------------------------------------
# Sector membership auto-numbering
# ---------------------------------------------------------
COUNTER_FILE="$COUNTER_DIR/${SECTOR_KEY}.count"

if [ ! -f "$COUNTER_FILE" ]; then
  echo 1 > "$COUNTER_FILE"
fi

MEMBER_NUM=$(cat "$COUNTER_FILE")
NEXT_NUM=$((MEMBER_NUM + 1))
echo "$NEXT_NUM" > "$COUNTER_FILE"

MEMBER_NUM_PADDED=$(printf "%03d" "$MEMBER_NUM")

OUTPUT_FILE="$OUTPUT_DIR/certificate_${SECTOR_KEY}_${CERT_UUID}.png"

# ---------------------------------------------------------
# PUBLIC QR (East)
# ---------------------------------------------------------
QR_TEMP="$OUTPUT_DIR/qr_${CERT_UUID}.png"
QR_DATA="UUID:$CERT_UUID | SERIAL:$SERIAL_NUM | NAME:$USER_NAME | SECTOR:$STAKEHOLDER | MEMBER_NO:$MEMBER_NUM_PADDED"

qrencode -t PNG --foreground=000000 --background=00000000 -o "$QR_TEMP" -s 10 "$QR_DATA"

QR_AURA="$OUTPUT_DIR/qr_${CERT_UUID}_aura.png"

magick "$QR_TEMP" \
  \( +clone -alpha extract -blur 0x22 -fill "gold" -colorize 85 \) \
  -compose DstOver -composite \
  "$QR_AURA"

# ---------------------------------------------------------
# SECRET QR (West)
# ---------------------------------------------------------
QR_SECRET_TEMP="$OUTPUT_DIR/qr_secret_${CERT_UUID}.png"
QR_SECRET_DATA="http://127.0.0.1:8080/insurance/viewer.html?token=$INS_UUID"

qrencode -t PNG --foreground=000000 --background=00000000 -o "$QR_SECRET_TEMP" -s 10 "$QR_SECRET_DATA"

QR_SECRET_AURA="$OUTPUT_DIR/qr_secret_${CERT_UUID}_aura.png"

magick "$QR_SECRET_TEMP" \
  \( +clone -alpha extract -blur 0x22 -fill "gold" -colorize 85 \) \
  -compose DstOver -composite \
  "$QR_SECRET_AURA"

# ---------------------------------------------------------
# Compose certificate
# ---------------------------------------------------------
magick "$BASE" \
  \( "$SEAL" -resize 800x800 -alpha set -channel A -evaluate Multiply 0.15 \) \
      -gravity Center -composite \
  \( "$PVT" -resize 260x260 \) \
      -gravity North -geometry +0+120 -composite \
  \( "$CREST" -resize 200x200 \) \
      -gravity NorthWest -geometry +100+160 -composite \
  \( "$UNITY" -resize 220x320 \) \
      -gravity NorthEast -geometry +100+140 -composite \
  \( "$COVENANT" -resize 200x200 \) \
      -gravity Center -geometry +0+280 -composite \
  \( "$SIGNATURE" -resize 600x240 -alpha set -channel A -evaluate Multiply 1.0 \) \
      -gravity SouthWest -geometry +180+140 -composite \
  \( "$AUTH_SEAL" -resize 160x160 \) \
      -gravity SouthWest -geometry +160+150 -composite \
  \( "$AUTHORITY" -resize 140x140 \) \
      -gravity SouthWest -geometry +720+160 -composite \
  \( "$QR_SECRET_AURA" -resize 100x100 \) \
      -gravity West -geometry +80+0 -composite \
  \( "$QR_AURA" -resize 100x100 \) \
      -gravity East -geometry +80+0 -composite \
  -gravity Center -pointsize 48 -fill black -annotate +0-120 "This Certificate is Awarded To:" \
  -gravity Center -pointsize 40 -fill black -annotate +0-40 "$USER_NAME" \
  -gravity Center -pointsize 32 -fill black -annotate +0+40 "For distinguished service in $STAKEHOLDER" \
  -gravity Center -pointsize 28 -fill black -annotate +0+100 "Sector Membership No: $MEMBER_NUM_PADDED" \
  -gravity SouthWest -pointsize 24 -fill black -annotate +120+320 "Certification UUID: $CERT_UUID" \
  -gravity SouthEast -pointsize 24 -fill black -annotate +120+300 "Serial Number: $SERIAL_NUM" \
  "$OUTPUT_FILE"

echo "✨ Generated: $OUTPUT_FILE"

# ---------------------------------------------------------
# Ledger entry
# ---------------------------------------------------------
echo "$(date +%Y-%m-%d),$STAKEHOLDER,$USER_NAME,$OUTPUT_FILE,$CERT_UUID,$SERIAL_NUM,$MEMBER_NUM_PADDED,$SECTOR_KEY,$INS_UUID" >> "$LEDGER"

# ---------------------------------------------------------
# Metadata JSON (NEW)
# ---------------------------------------------------------
META_FILE="$OUTPUT_DIR/${INS_UUID}_metadata.json"

jq -n \
  --arg ins_uuid "$INS_UUID" \
  --arg sector "$STAKEHOLDER" \
  --arg serial "$SERIAL_NUM" \
  --arg issued_at "$ISSUED_AT" \
  --arg cert_path "$OUTPUT_FILE" \
  '
  {
    ins_uuid: $ins_uuid,
    sector: $sector,
    serial: $serial,
    issued_at: $issued_at,
    certificate_path: $cert_path
  }
  ' > "$META_FILE"

echo "📝 Metadata written: $META_FILE"

echo "🔑 UUID: $CERT_UUID"
echo "🔢 Serial: $SERIAL_NUM"
echo "👥 Sector Membership No: $MEMBER_NUM_PADDED"
echo "🛡 INS UUID: $INS_UUID"
