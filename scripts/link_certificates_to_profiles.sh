#!/bin/bash

PROFILE_DIR="public/certificates/insurance/profiles"
INDEX_FILE="public/certificates/insurance/profiles_index.json"
CERT_DIR="public/certificates/output"

echo "🔍 Linking certificates to profiles..."

for cert in "$CERT_DIR"/*.json; do
  [ -f "$cert" ] || continue

  # Skip ledger.json or any non-certificate JSON
  if echo "$cert" | grep -qi "ledger.json"; then
    echo "⏭️  Skipping ledger file: $cert"
    continue
  fi

  # Check if file contains certificate metadata (must be an object)
  if ! jq -e 'type == "object"' "$cert" >/dev/null 2>&1; then
    echo "⏭️  Skipping non-certificate JSON: $cert"
    continue
  fi

  ins_uuid=$(jq -r '.ins_uuid // empty' "$cert")
  sector=$(jq -r '.sector // empty' "$cert")
  serial=$(jq -r '.serial // empty' "$cert")
  issued=$(jq -r '.issued_at // empty' "$cert")

  if [ -z "$ins_uuid" ]; then
    echo "⚠️  Certificate $cert has no ins_uuid — skipping"
    continue
  fi

  profile_file="$PROFILE_DIR/$ins_uuid.json"

  if [ ! -f "$profile_file" ]; then
    echo "⚠️  No profile found for $ins_uuid — skipping"
    continue
  fi

  tmp=$(mktemp)
  jq --arg sector "$sector" \
     --arg serial "$serial" \
     --arg issued "$issued" \
     '
       .sector = $sector |
       .certificate_serial = $serial |
       .certificate_issued_at = $issued
     ' "$profile_file" > "$tmp" && mv "$tmp" "$profile_file"

  echo "✅ Linked certificate → profile: $ins_uuid ($sector)"
done

echo "🎉 Certificate linking complete."
