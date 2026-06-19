#!/bin/bash

PROFILE_DIR="public/certificates/insurance/profiles"
INDEX_FILE="public/certificates/insurance/profiles_index.json"
SEALS_DIR="public/certificates/assets/federation-seals"

# Load sectors from folder names, excluding seal attributes
SECTORS=()
for s in $(ls -1 "$SEALS_DIR"); do
  case "$s" in
    authentication|authority)
      continue
      ;;
    *)
      SECTORS+=("$s")
      ;;
  esac
done

echo "Active ATS sectors:"
printf ' - %s\n' "${SECTORS[@]}"

assign_sector() {
  local name="$1"
  local email="$2"

  # Rule 1: match by name keyword
  for sector in "${SECTORS[@]}"; do
    if echo "$name" | grep -qi "$sector"; then
      echo "$sector"
      return
    fi
  done

  # Rule 2: match by email domain
  for sector in "${SECTORS[@]}"; do
    if echo "$email" | grep -qi "$sector"; then
      echo "$sector"
      return
    fi
  done

  # Rule 3: default sector
  echo "community-members"
}

for uuid in $(jq -r '.[]' "$INDEX_FILE"); do
  file="$PROFILE_DIR/$uuid.json"
  if [ ! -f "$file" ]; then
    continue
  fi

  name=$(jq -r '.name // ""' "$file")
  email=$(jq -r '.email // ""' "$file")

  sector=$(assign_sector "$name" "$email")

  tmp=$(mktemp)
  jq --arg sector "$sector" '.sector = $sector' "$file" > "$tmp" && mv "$tmp" "$file"

  echo "Assigned sector [$sector] to profile [$uuid] ($name)"
done

echo "✅ Sector assignment complete."
