#!/bin/bash
# ceremonial-deck.sh — orchestrates banner reveals and narration

declare -A narration=(
  ["Flame"]="From the spark of purpose, the torch rises. Phoenix wings unfurl, and the chamber glows red with resolve. We ignite the torch of unity."
  ["River"]="Through the currents of compassion, the wave flows. Dolphin leaps in starlight, and the chamber ripples blue with grace. We flow together in harmony."
  ["Stone"]="Upon the mountain of endurance, the pillar stands. Echoes resound through mist, and the chamber steadies in grey. We stand firm in resilience."
  ["All"]="Within the circle of eternity, the serpent coils. Ouroboros glows golden, and the chamber hums with renewal. We sanctify the eternal cycle."
  ["Neutral"]="Between flame and flow, between stone and cycle, balance breathes. The star, moon, and sun align, and the parchment glows with subtle light. We honor balance and subtlety."
)

branch=$1
vow=$2

if [[ -z "$branch" || -z "$vow" ]]; then
  echo "Usage: ./scripts/ceremonial-deck.sh <Branch> <Vow>"
  exit 1
fi

# Log the vow
./scripts/narration-logger.sh "$branch" "$vow"

# Display narration
echo ""
echo "🌌----- $branch Banner Reveal -----🌌"
echo "${narration[$branch]}"
echo ""
