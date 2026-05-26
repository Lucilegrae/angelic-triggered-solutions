#!/bin/bash
# ceremonial-cycle.sh — banners, overlays, backdrop, crescendo, fade-out, and legacy archive

archive_file="legacy-archive.log"
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

declare -A narration=(
  ["Flame"]="From the spark of purpose, the torch rises. Phoenix wings unfurl, and the chamber glows red with resolve. We ignite the torch of unity."
  ["River"]="Through the currents of compassion, the wave flows. Dolphin leaps in starlight, and the chamber ripples blue with grace. We flow together in harmony."
  ["Stone"]="Upon the mountain of endurance, the pillar stands. Echoes resound through mist, and the chamber steadies in grey. We stand firm in resilience."
  ["All"]="Within the circle of eternity, the serpent coils. Ouroboros glows golden, and the chamber hums with renewal. We sanctify the eternal cycle."
  ["Neutral"]="Between flame and flow, between stone and cycle, balance breathes. The star, moon, and sun align, and the parchment glows with subtle light. We honor balance and subtlety."
)

declare -A aura=(
  ["Flame"]="\e[31m"
  ["River"]="\e[34m"
  ["Stone"]="\e[90m"
  ["All"]="\e[33m"
  ["Neutral"]="\e[37m"
)

declare -A overlay=(
  ["Flame"]="   ✦✦✦ Phoenix Constellation ✦✦✦\n      \\\\   \n   (\\_/)🔥(\\_/) \n      //"
  ["River"]="   ✦✦✦ Dolphin Constellation ✦✦✦\n     ~~~~~\n   <°)))><   \n     ~~~~~"
  ["Stone"]="   ✦✦✦ Mountain Goat Constellation ✦✦✦\n      /\\\n     /  \\\n    ⛰️ Goat climbs"
  ["All"]="   ✦✦✦ Ouroboros Constellation ✦✦✦\n    ⭕ Snake biting tail ⭕"
  ["Neutral"]="   ✦✦✦ Star-Moon-Sun Constellation ✦✦✦\n     ✦   ☾   ☀"
)

branches=("Flame" "River" "Stone" "All" "Neutral")

# Begin Legacy Archive Entry
echo "" >> $archive_file
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> $archive_file
echo "✦ Legacy Archive Entry ✦" >> $archive_file
echo "Timestamp: $timestamp" >> $archive_file
echo "Cycle: Kubatana Covenant" >> $archive_file
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> $archive_file

for branch in "${branches[@]}"; do
  vow="Ceremonial vow for $branch"
  ./scripts/narration-logger.sh "$branch" "$vow"

  echo ""
  echo -e "${aura[$branch]}🌌----- $branch Banner Reveal -----🌌"
  echo -e "${narration[$branch]}\e[0m"
  echo -e "${overlay[$branch]}"
  echo -e "\a"
  echo ""

  blessing_count=$(grep -c "$branch" $archive_file)
  echo "Branch: $branch — Blessing #$((blessing_count+1))" >> $archive_file

  sleep 3
done

echo "✨ Covenant sealed and archived ✨" >> $archive_file
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> $archive_file

# Scroll-Aura ASCII Backdrop
echo ""
echo "🌌----- Cosmic Scroll Aura -----🌌"
cat << "EOF"
        ✦        ✦        ✦
     ⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆
   ✦ Orion ✦ Lyra ✦ Cygnus ✦ Cassiopeia ✦
     ⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆
        ✦        ✦        ✦

   ───✦───✦───✦───✦───✦───✦───
   ➝⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆⋆➝ lineage flows
   ⋆⋆⋆⋆⋆ ancestral paths ⋆⋆⋆⋆⋆
   ✧ spark trails shimmer ✧
EOF
echo ""

# Unified Crescendo Block
echo "🌌----- Unified Crescendo -----🌌"
for i in {1..3}; do
  echo -e "\e[31m🔥 Flame ignites...\e[0m\a"
  sleep 0.5
  echo -e "\e[34m🌊 River flows...\e[0m\a"
  sleep 0.5
  echo -e "\e[90m⛰️ Stone resounds...\e[0m\a"
  sleep 0.5
  echo -e "\e[33m⭕ All cycles...\e[0m\a"
  sleep 0.5
  echo -e "\e[37m✦ Neutral balances...\e[0m\a"
  sleep 0.5
done

# Fade-Out Sequence
echo ""
echo "🌌----- Crescendo Fade-Out -----🌌"
for branch in "${branches[@]}"; do
  echo -e "${aura[$branch]}Fading ${branch} aura...\e[0m"
  sleep 1
done
echo -e "\e[37m✦ All auras dim to parchment neutral ✦\e[0m"
echo ""

echo "✨ All branches converge — Cosmic Covenant sealed ✨"
