#!/bin/bash
# covenant-sounds.sh
# Multi-branch ceremonial sound pipeline with branch-specific trimming and fades

SOUND_DIR=~/angelic-triggered-solutions/angelic-triggered-solutions/public/sounds
LOG_FILE=~/angelic-triggered-solutions/phrases.log

# Load environment variables
source ~/angelic-triggered-solutions/angelic-triggered-solutions/sound.env

declare -A BRANCHES=(
  ["Branch I"]="celestial.mp3"
  ["Branch II"]="river.mp3"
  ["Branch III"]="flame.mp3"
  ["Branch IV"]="stone.mp3"
  ["Branch V"]="ouroboros.mp3"
)

for branch in "${!BRANCHES[@]}"; do
    sound="${SOUND_DIR}/${BRANCHES[$branch]}"
    echo "[Invocation] $branch | Motif: $(basename "$sound") | Timestamp: $(date)" >> "$LOG_FILE"

    case "$branch" in
      "Branch I")
        $SOUND_PLAYER "$sound" trim $BRANCH_I_TRIM_START $BRANCH_I_TRIM_DURATION fade t $BRANCH_I_FADE_IN 0 $BRANCH_I_FADE_OUT gain $SOUND_GAIN &
        ;;
      "Branch II")
        $SOUND_PLAYER "$sound" trim $BRANCH_II_TRIM_START $BRANCH_II_TRIM_DURATION fade t $BRANCH_II_FADE_IN 0 $BRANCH_II_FADE_OUT gain $SOUND_GAIN &
        ;;
      "Branch III")
        $SOUND_PLAYER "$sound" trim $BRANCH_III_TRIM_START $BRANCH_III_TRIM_DURATION fade t $BRANCH_III_FADE_IN 0 $BRANCH_III_FADE_OUT gain $SOUND_GAIN &
        ;;
      "Branch IV")
        $SOUND_PLAYER "$sound" trim $BRANCH_IV_TRIM_START $BRANCH_IV_TRIM_DURATION fade t $BRANCH_IV_FADE_IN 0 $BRANCH_IV_FADE_OUT gain $SOUND_GAIN &
        ;;
      "Branch V")
        $SOUND_PLAYER "$sound" trim $BRANCH_V_TRIM_START $BRANCH_V_TRIM_DURATION fade t $BRANCH_V_FADE_IN 0 $BRANCH_V_FADE_OUT gain $SOUND_GAIN &
        ;;
    esac

    # Let motif play for its duration
    sleep 6

    # Stop motif
    pkill play
    echo "[Completion] $branch | Motif sealed | Timestamp: $(date)" >> "$LOG_FILE"

    # Separator for scroll-like readability
    echo "----------------------------------------" >> "$LOG_FILE"
done
