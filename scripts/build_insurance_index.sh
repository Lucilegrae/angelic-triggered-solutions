#!/bin/bash
INS_DIR="public/certificates/insurance/profiles"
OUT_FILE="public/certificates/insurance/profiles_index.json"

mkdir -p "$INS_DIR"

echo "[]" > "$OUT_FILE"

TMP=$(mktemp)
echo "[" > "$TMP"

first=1
for f in "$INS_DIR"/*.json; do
  [ -e "$f" ] || continue
  if [ $first -eq 0 ]; then
    echo "," >> "$TMP"
  fi
  first=0
  # extract minimal fields with jq if available, else raw cat
  if command -v jq >/dev/null 2>&1; then
    jq '{ins_uuid, name, policy_number, status, email}' "$f" >> "$TMP"
  else
    # fallback: just wrap filename
    bn=$(basename "$f")
    echo "{\"ins_uuid\":\"${bn%.json}\",\"name\":\"(edit with jq)\",\"policy_number\":\"\",\"status\":\"Unknown\"}" >> "$TMP"
  fi
done

echo "]" >> "$TMP"
mv "$TMP" "$OUT_FILE"

echo "✅ Insurance profiles index built: $OUT_FILE"
