#!/bin/bash
CREST_DIR=~/angelic-triggered-solutions/angelic-triggered-solutions/public/images/crests

echo "🔹 Ceremonial Crest Repair Log"
echo "-----------------------------------"

for file in $CREST_DIR/*.jpeg; do
  crest_png="${file%.jpeg}.png"
  if [ ! -f "$crest_png" ]; then
    echo "⚠️ Missing: $(basename $crest_png) → reconverting..."
    magick "$file" "$crest_png"
    echo "✅ $(basename $crest_png) restored."
  else
    echo "✅ $(basename $crest_png) already present."
  fi
done

echo "-----------------------------------"
echo "✨ Repair complete."
