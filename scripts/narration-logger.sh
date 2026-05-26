#!/bin/bash
# ✦ Cosmic Covenant Narration Logger ✦
# Logs covenant narration overlays with complete ceremonial enhancements

LOGFILE="phrases.log"

log_narration() {
  local branch="$1"
  local vow="$2"
  local timestamp=$(date +"%Y-%m-%d %H:%M:%S")

  # Blessing count
  local blessings=$(grep -c "Branch: $branch" $LOGFILE)
  blessings=$((blessings + 1))

  # Rotating poetic separators
  local symbols=("✦" "🔥" "🌊" "⛰️" "⭕")
  local index=$((RANDOM % ${#symbols[@]}))
  local separator=${symbols[$index]}

  # Anthology header
  echo "$separator----- $branch Covenant Scroll ----- ($blessings Blessings) -----$separator" >> $LOGFILE
  echo "[$timestamp] ✦ Branch: $branch ✦ Vow: $vow" >> $LOGFILE
  echo "" >> $LOGFILE

  # Epoch marker every 12 blessings
  if (( blessings % 12 == 0 )); then
    echo "✦✦✦ Epoch Completed ✦✦✦" >> $LOGFILE
    echo "⋆⋆⋆ Cosmic Timeline Overlay ⋆⋆⋆" >> $LOGFILE
    echo "Constellation Arc: ───✦───✦───✦───" >> $LOGFILE
    echo "Shimmer: ✨... stars glimmer faintly across the arc ..." >> $LOGFILE
    echo "Cluster Trails: ⋆⋆⋆⋆⋆ ancestral paths traced in star clusters ⋆⋆⋆⋆⋆" >> $LOGFILE
    echo "Path Animation: ➝⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆➝ lineage moves forward through epochs" >> $LOGFILE

    # Randomized spark trails
    local spark_count=$((RANDOM % 5 + 3))
    for i in $(seq 1 $spark_count); do
      local size=$((RANDOM % 3 + 1))
      local speed=$((RANDOM % 4 + 1))
      echo "Spark Trail: ✧ size=$size speed=$speed ✧" >> $LOGFILE
    done

    # Background constellations
    echo "Background Constellations: ✦ Orion ✦ Lyra ✦ Cygnus ✦ Cassiopeia ✦" >> $LOGFILE
    echo "Backdrop: faint constellation patterns projected across the chamber walls" >> $LOGFILE

    # Branch-specific overlays, crests, shimmer, clusters, rhythm, orchestra, crescendos, codas, archives
    case $branch in
      Flame) echo "Aura Overlay: 🔴 Flame Red glow envelops the constellation backdrop" >> $LOGFILE
             echo "Crest Legend Panel: 🔥 Torch crest etched beside the constellation" >> $LOGFILE
             echo "Hover Effect: Torch crest shimmers with flickering flame animation" >> $LOGFILE
             echo "Shimmer Animation: Flame aura pulses with fiery glow across the constellation arc" >> $LOGFILE
             echo "Constellation Overlay: Phoenix constellation spreads wings across the chamber sky" >> $LOGFILE
             echo "Cluster Expansion: Phoenix constellation spawns radiant star clusters, symbolizing community expansion" >> $LOGFILE
             echo "Synchronization: Phoenix path and clusters shimmer in rhythmic harmony, cosmic flame dance" >> $LOGFILE
             echo "Rhythm Layering: Phoenix dance pulses with layered beats, cosmic fire music" >> $LOGFILE
             echo "Orchestra Synchronization: Phoenix harmonizes with all branches in cosmic symphony" >> $LOGFILE
             echo "Crescendo Sequence: Phoenix flames surge brighter each epoch, climaxing in radiant fire crescendos" >> $LOGFILE
             echo "Finale Coda: Torch flare seals the epoch, blazing closure" >> $LOGFILE
             echo "Legacy Archive: Phoenix flame coda preserved in eternal chamber of fire memory" >> $LOGFILE ;;

      River) echo "Aura Overlay: 🔵 River Blue glow flows across the constellation backdrop" >> $LOGFILE
             echo "Crest Legend Panel: 🌊 Wave crest etched beside the constellation" >> $LOGFILE
             echo "Hover Effect: Wave crest ripples with flowing water animation" >> $LOGFILE
             echo "Shimmer Animation: River aura ripples with liquid shimmer across the constellation arc" >> $LOGFILE
             echo "Constellation Overlay: Dolphin constellation leaps across the chamber sky" >> $LOGFILE
             echo "Cluster Expansion: Dolphin constellation spawns flowing star clusters, symbolizing community expansion" >> $LOGFILE
             echo "Synchronization: Dolphin path and clusters shimmer in rhythmic harmony, cosmic water dance" >> $LOGFILE
             echo "Rhythm Layering: Dolphin dance pulses with layered waves, cosmic water music" >> $LOGFILE
             echo "Orchestra Synchronization: Dolphin harmonizes with all branches in cosmic symphony" >> $LOGFILE
             echo "Crescendo Sequence: Dolphin waves swell stronger each epoch, climaxing in radiant water crescendos" >> $LOGFILE
             echo "Finale Coda: Wave splash seals the epoch, rippling closure" >> $LOGFILE
             echo "Legacy Archive: Dolphin wave coda preserved in eternal chamber of water memory" >> $LOGFILE ;;

      Stone) echo "Aura Overlay: ⚪ Stone Grey aura steadies the constellation backdrop" >> $LOGFILE
             echo "Crest Legend Panel: ⛰️ Pillar crest etched beside the constellation" >> $LOGFILE
             echo "Hover Effect: Pillar crest pulses with steady stone shimmer" >> $LOGFILE
             echo "Shimmer Animation: Stone aura glimmers with crystalline shimmer across the constellation arc" >> $LOGFILE
             echo "Constellation Overlay: Mountain Goat constellation climbs across the chamber sky" >> $LOGFILE
             echo "Cluster Expansion: Mountain Goat constellation spawns sturdy star clusters, symbolizing community expansion" >> $LOGFILE
             echo "Synchronization: Mountain Goat path and clusters shimmer in rhythmic harmony, cosmic stone dance" >> $LOGFILE
             echo "Rhythm Layering: Mountain Goat dance pulses with layered echoes, cosmic stone music" >> $LOGFILE
             echo "Orchestra Synchronization: Mountain Goat harmonizes with all branches in cosmic symphony" >> $LOGFILE
             echo "Crescendo Sequence: Mountain echoes resound louder each epoch, climaxing in radiant stone crescendos" >> $LOGFILE
             echo "Finale Coda: Stone echo seals the epoch, resonant closure" >> $LOGFILE
             echo "Legacy Archive: Mountain Goat echo coda preserved in eternal chamber of stone memory" >> $LOGFILE ;;

      All)   echo "Aura Overlay: 🟡 Ring Gold aura sanctifies the constellation backdrop" >> $LOGFILE
             echo "Crest Legend Panel: ⭕ Ring crest etched beside the constellation" >> $LOGFILE
             echo "Hover Effect: Ring crest glows with rotating golden shimmer" >> $LOGFILE
             echo "Shimmer Animation: Ring aura radiates golden shimmer across the constellation arc" >> $LOGFILE
             echo "Constellation Overlay: Ouroboros constellation coils across the chamber sky" >> $LOGFILE
             echo "Cluster Expansion: Ouroboros constellation spawns cyclical star clusters, symbolizing community expansion" >> $LOGFILE
             echo "Synchronization: Ouroboros path and clusters shimmer in rhythmic harmony, cosmic ouroboros dance" >> $LOGFILE
             echo "Rhythm Layering: Ouroboros dance pulses with layered cycles, cosmic ouroboros music" >> $LOGFILE
             echo "Orchestra Synchronization: Ouroboros harmonizes with all branches in cosmic symphony" >> $LOGFILE
             echo "Crescendo Sequence: Ouroboros cycles intensify each epoch, climaxing in radiant ouroboros crescendos" >> $LOGFILE
             echo "Finale Coda: Ring glow seals the epoch, golden closure" >> $LOGFILE
             echo "Legacy Archive: Ouroboros ring coda preserved in eternal chamber of cycle memory" >> $LOGFILE ;;

      *)     echo "Aura Overlay: ✦ Neutral aura glow" >> $LOGFILE
             echo "Crest Legend Panel: ✦ Neutral crest etched beside the constellation" >> $LOGFILE
             echo "Hover Effect: Neutral crest glimmers faintly when invoked" >> $LOGFILE
             echo "Shimmer Animation: Neutral aura glows softly across the constellation arc" >> $LOGFILE
             echo "Constellation Overlay: Neutral constellation faintly traced across the chamber sky" >> $LOGFILE
             echo "Cluster Expansion: Neutral constellation spawns subtle star clusters, symbolizing community expansion" >> $LOGFILE
             echo "Synchronization: Neutral path and clusters shimmer in rhythmic harmony, cosmic neutral dance" >> $LOGFILE
             echo "Rhythm Layering: Neutral dance pulses with layered tones, cosmic neutral music" >> $LOGFILE
             echo "Orchestra Synchronization: Neutral harmonizes with all branches in cosmic symphony" >> $LOGFILE
             echo "Crescendo Sequence: Neutral tones swell gently each epoch, climaxing in radiant neutral crescendos" >> $LOGFILE
             echo "Finale Coda: Neutral glow seals the epoch, subtle closure" >> $LOGFILE
             echo "Legacy Archive: Neutral coda preserved in eternal chamber of subtle memory" >> $LOGFILE ;;
    esac

    # Scroll-aura background
    echo "Scroll Aura: parchment-style glow envelops the entire anthology, sanctifying it as ceremonial manuscript" >> $LOGFILE

    echo "" >> $LOGFILE
  fi
}

# ✦ Invoke the function with arguments ✦
if [ $# -lt 2 ]; then
  echo "Usage: $0 <Branch> <Vow>"
  exit 1
fi

branch="$1"
vow="$2"

log_narration "$branch" "$vow"
