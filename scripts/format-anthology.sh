#!/bin/bash
# format-anthology.sh
# Transform phrases.log into scroll-like anthology with crest banners

LOG_FILE=~/angelic-triggered-solutions/phrases.log
OUTPUT_FILE=~/angelic-triggered-solutions/anthology-scroll.log

# Motif-colored separators
declare -A COLORS=(
  ["Branch I"]="✨🌌 Celestial Shimmer ✨🌌"
  ["Branch II"]="💧🌊 River Ripple 💧🌊"
  ["Branch III"]="🔥✨ Flame Flicker 🔥✨"
  ["Branch IV"]="🪨🔔 Stone Resonance 🪨🔔"
  ["Branch V"]="🐍∞ Ouroboros Loop 🐍∞"
)

# Crest banners (from visual.env)
BRANCH_I_CREST="banners/celestial-crest.svg"
BRANCH_II_CREST="banners/river-crest.svg"
BRANCH_III_CREST="banners/flame-crest.svg"
BRANCH_IV_CREST="banners/stone-crest.svg"
BRANCH_V_CREST="banners/ouroboros-crest.svg"

# Clear output file
> "$OUTPUT_FILE"

while IFS= read -r line; do
  case "$line" in
    *"Branch I"*)
      echo "${COLORS["Branch I"]}" >> "$OUTPUT_FILE"
      echo "    Crest Banner: $BRANCH_I_CREST" >> "$OUTPUT_FILE"
      echo "    $line" >> "$OUTPUT_FILE"
      ;;
    *"Branch II"*)
      echo "${COLORS["Branch II"]}" >> "$OUTPUT_FILE"
      echo "    Crest Banner: $BRANCH_II_CREST" >> "$OUTPUT_FILE"
      echo "    $line" >> "$OUTPUT_FILE"
      ;;
    *"Branch III"*)
      echo "${COLORS["Branch III"]}" >> "$OUTPUT_FILE"
      echo "    Crest Banner: $BRANCH_III_CREST" >> "$OUTPUT_FILE"
      echo "    $line" >> "$OUTPUT_FILE"
      ;;
    *"Branch IV"*)
      echo "${COLORS["Branch IV"]}" >> "$OUTPUT_FILE"
      echo "    Crest Banner: $BRANCH_IV_CREST" >> "$OUTPUT_FILE"
      echo "    $line" >> "$OUTPUT_FILE"
      ;;
    *"Branch V"*)
      echo "${COLORS["Branch V"]}" >> "$OUTPUT_FILE"
      echo "    Crest Banner: $BRANCH_V_CREST" >> "$OUTPUT_FILE"
      echo "    $line" >> "$OUTPUT_FILE"
      ;;
    *"[Benediction]"*)
      echo "🌟 Benediction 🌟" >> "$OUTPUT_FILE"
      echo "    $line" >> "$OUTPUT_FILE"
      ;;
    *"[Crescendo]"*|*"[Crescendo Completion]"*)
      echo "🌌 Unified Crescendo 🌌" >> "$OUTPUT_FILE"
      echo "    $line" >> "$OUTPUT_FILE"
      ;;
    *)
      echo "    $line" >> "$OUTPUT_FILE"
      ;;
  esac
done < "$LOG_FILE"

echo "✨ Golden Scroll Sealed ✨" >> "$OUTPUT_FILE"
