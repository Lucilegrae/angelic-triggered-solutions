#!/data/data/com.termux/files/usr/bin/bash

# Source folder (where Android saves Copilot images)
SRC_DIR=~/storage/shared/Download/Copilot\ Images
# Destination folder inside your project
DEST_DIR=~/angelic-triggered-solutions/angelic-triggered-solutions/public/certificates/assets

echo "🔄 Syncing assets from $SRC_DIR to $DEST_DIR..."

# Copy all JPEG files into destination
cp "$SRC_DIR"/*.jpeg "$DEST_DIR"/

cd "$DEST_DIR" || exit

# Define motifs and their standardized names
declare -A motifs=(
  ["ATS_Crest"]="crest.png"
  ["Parchment_Background"]="parchment.png"
  ["Golden_Frame"]="frame.png"
  ["Cosmic_Frame"]="cosmic.png"
  ["In_Unity_Faith"]="unity.png"
)

# Process each motif
for motif in "${!motifs[@]}"; do
  latest=$(ls -t ${motif}*.jpeg 2>/dev/null | head -n 1)
  if [ -n "$latest" ]; then
    # Remove older duplicates
    for f in ${motif}*.jpeg; do
      if [ "$f" != "$latest" ]; then
        rm "$f"
        echo "🗑️ Removed duplicate $f"
      fi
    done
    # Convert latest to standardized PNG name
    magick "$latest" "${motifs[$motif]}"
    echo "✅ Converted $latest → ${motifs[$motif]}"
  fi
done

echo "✨ Assets synced, duplicates cleaned, and standardized PNGs generated."
