#!/bin/bash
# covenant-workflow.sh
# Two-phase ceremonial workflow: preparation + invocation + crescendo + benediction

RAW_DIR=~/angelic-triggered-solutions/raw_sounds
SOUND_DIR=~/angelic-triggered-solutions/angelic-triggered-solutions/public/sounds
LOG_FILE=~/angelic-triggered-solutions/phrases.log

# Load environment variables
source ~/angelic-triggered-solutions/angelic-triggered-solutions/sound.env
source ~/angelic-triggered-solutions/angelic-triggered-solutions/visual.env

# --- Phase 1: Preparation ---
echo "[Preparation] Processing raw motifs into polished sounds..." >> "$LOG_FILE"
# (SoX processing commands here — unchanged)
echo "[Preparation Complete] Motifs polished and stored in $SOUND_DIR" >> "$LOG_FILE"

# --- Phase 2: Invocation ---
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
        echo "[Visual Affirmation] $branch | Banner: $BRANCH_I_BANNER | Overlay: $BRANCH_I_OVERLAY | Aura: $BRANCH_I_AURA | Timestamp: $(date)" >> "$LOG_FILE"
        ;;
      "Branch II")
        echo "[Visual Affirmation] $branch | Banner: $BRANCH_II_BANNER | Overlay: $BRANCH_II_OVERLAY | Aura: $BRANCH_II_AURA | Timestamp: $(date)" >> "$LOG_FILE"
        ;;
      "Branch III")
        echo "[Visual Affirmation] $branch | Banner: $BRANCH_III_BANNER | Overlay: $BRANCH_III_OVERLAY | Aura: $BRANCH_III_AURA | Timestamp: $(date)" >> "$LOG_FILE"
        ;;
      "Branch IV")
        echo "[Visual Affirmation] $branch | Banner: $BRANCH_IV_BANNER | Overlay: $BRANCH_IV_OVERLAY | Aura: $BRANCH_IV_AURA | Timestamp: $(date)" >> "$LOG_FILE"
        ;;
      "Branch V")
        echo "[Visual Affirmation] $branch | Banner: $BRANCH_V_BANNER | Overlay: $BRANCH_V_OVERLAY | Aura: $BRANCH_V_AURA | Timestamp: $(date)" >> "$LOG_FILE"
        ;;
    esac

    # Visitor Controls
    if [ "$VISITOR_MUTE" = true ]; then
        echo "[Visitor Control] $branch | State: Muted | Timestamp: $(date)" >> "$LOG_FILE"
        echo "[Visual Indicator] $branch | Icon: $VISUAL_MUTE_ICON | Timestamp: $(date)" >> "$LOG_FILE"
        $SOUND_PLAYER -v 0 "$sound"
    else
        echo "[Visitor Control] $branch | Volume: $VISITOR_VOLUME% | Timestamp: $(date)" >> "$LOG_FILE"
        echo "[Visual Indicator] $branch | Icon: $VISUAL_VOLUME_ICON | Timestamp: $(date)" >> "$LOG_FILE"
        VOL=$(echo "$VISITOR_VOLUME / 100" | bc -l)
        $SOUND_PLAYER -v "$VOL" "$sound"
    fi

    echo "[Completion] $branch | Motif sealed | Timestamp: $(date)" >> "$LOG_FILE"
    echo "----------------------------------------" >> "$LOG_FILE"
done

# --- Phase 3: Unified Crescendo ---
echo "[Crescendo] All branches converge | Timestamp: $(date)" >> "$LOG_FILE"
for branch in "${!BRANCHES[@]}"; do
    sound="${SOUND_DIR}/${BRANCHES[$branch]}"
    case "$branch" in
      "Branch I") AURA=$BRANCH_I_AURA ;;
      "Branch II") AURA=$BRANCH_II_AURA ;;
      "Branch III") AURA=$BRANCH_III_AURA ;;
      "Branch IV") AURA=$BRANCH_IV_AURA ;;
      "Branch V") AURA=$BRANCH_V_AURA ;;
    esac
    echo "[Crescendo Visual] $branch | Aura: $AURA | Timestamp: $(date)" >> "$LOG_FILE"
    if [ "$VISITOR_MUTE" = true ]; then
        $SOUND_PLAYER -v 0 "$sound" &
    else
        VOL=$(echo "$VISITOR_VOLUME / 100" | bc -l)
        $SOUND_PLAYER -v "$VOL" "$sound" &
    fi
done
sleep 8
pkill play
echo "[Crescendo Completion] Unified motif sealed | Timestamp: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

# --- Phase 4: Closing Benediction ---
BENEDICTIONS=(
  "May the Celestial shimmer guide your path."
  "May the River ripple carry your burdens away."
  "May the Flame flicker ignite your courage."
  "May the Stone resonance anchor your strength."
  "May the Ouroboros loop remind you of eternal renewal."
)

for blessing in "${BENEDICTIONS[@]}"; do
    echo "[Benediction] $blessing | Timestamp: $(date)" >> "$LOG_FILE"
done

echo "✨ Golden Separator ✨" >> "$LOG_FILE"
echo "***** Ceremony Sealed *****" >> "$LOG_FILE"
