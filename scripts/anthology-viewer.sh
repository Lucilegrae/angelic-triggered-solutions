#!/bin/bash
# anthology-viewer.sh — dual-mode: interactive, recital, or highlight
# Includes chapter dividers, closing flourish, branch blessing tally with percentages + color-coded bars,
# cosmic balance wheel with continuous rotation and crescendo effect

archive_file="legacy-archive.log"

if [[ ! -f "$archive_file" ]]; then
  echo "⚠️ No legacy archive found. Run ceremonial-cycle.sh first."
  exit 1
fi

# Mode selection
echo "Choose mode:"
echo "1) Interactive (press Enter to reveal each line)"
echo "2) Recital (auto-scroll with timed delays)"
echo "3) Highlight (show only timestamps and seals)"
read -p "Enter choice [1/2/3]: " mode

echo ""
echo "🌌----- Kubatana Legacy Anthology -----🌌"
echo ""

# Function to animate chapter divider
chapter_divider() {
  echo ""
  for i in {1..40}; do
    printf "⋆"
    sleep 0.03
  done
  echo ""
  echo "✦ New Chapter ✦"
  for i in {1..40}; do
    printf "⋆"
    sleep 0.03
  done
  echo ""
}

# Function for closing flourish
closing_flourish() {
  echo ""
  echo "🌌----- Closing Flourish -----🌌"
  for i in {1..20}; do
    printf "⋆"
    sleep 0.03
  done
  echo -e "\n        ✦"
  for i in {1..20}; do
    printf "⋆"
    sleep 0.03
  done
  echo ""
  echo "✦ Anthology Sealed ✦"
}

# Main recital loop
while IFS= read -r line; do
  case "$line" in
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
      [[ "$mode" != "3" ]] && echo -e "\e[33m$line\e[0m"
      ;;
    "✦ Legacy Archive Entry ✦")
      [[ "$mode" != "3" ]] && echo -e "\e[37m$line\e[0m"
      [[ "$mode" != "3" ]] && chapter_divider
      ;;
    Timestamp*)
      echo -e "\e[34m$line\e[0m"
      ;;
    Cycle*)
      [[ "$mode" != "3" ]] && echo -e "\e[90m$line\e[0m"
      ;;
    Branch*)
      [[ "$mode" != "3" ]] && echo -e "\e[31m$line\e[0m"
      ;;
    "✨ Covenant sealed and archived ✨")
      echo -e "\e[33m$line\e[0m"
      ;;
    *)
      [[ "$mode" != "3" ]] && echo "$line"
      ;;
  esac

  # Mode behavior
  if [[ "$mode" == "1" ]]; then
    read -p "Press Enter to continue..." dummy
  elif [[ "$mode" == "2" ]]; then
    sleep 1.5
  fi
done < "$archive_file"

closing_flourish

# Branch Blessing Tally with Percentages + Color-coded Bars
echo ""
echo "🌌----- Branch Blessing Tally -----🌌"
total=0
declare -A counts
for branch in Flame River Stone All Neutral; do
  counts[$branch]=$(grep -c "Branch: $branch" $archive_file)
  total=$((total + counts[$branch]))
done

declare -A colors=(
  ["Flame"]="\e[31m"   # Red
  ["River"]="\e[34m"   # Blue
  ["Stone"]="\e[90m"   # Grey
  ["All"]="\e[33m"     # Gold/Yellow
  ["Neutral"]="\e[37m" # White
)

for branch in Flame River Stone All Neutral; do
  if [[ $total -gt 0 ]]; then
    percent=$(echo "scale=2; (${counts[$branch]} / $total) * 100" | bc)
    bar_length=$(echo "(${counts[$branch]} * 20) / $total" | bc)
  else
    percent=0
    bar_length=0
  fi
  bar=$(printf "%-${bar_length}s" | tr ' ' '█')
  echo -e "${colors[$branch]}$branch Blessings: ${counts[$branch]} (${percent}% of total) | $bar\e[0m"
done

# Cosmic Balance Wheel with Crescendo Rotation
echo ""
echo "🌌----- Cosmic Balance Wheel (Crescendo Rotation) -----🌌"

frames=(
"
                \e[31m🔥 Flame\e[0m
                   |
                   |
   \e[34m🌊 River\e[0m ---- ✦ Center ✦ ---- \e[90m⛰️ Stone\e[0m
                   |
                   |
                \e[33m⭕ All\e[0m
                   |
                   |
                \e[37m✦ Neutral\e[0m
"
"
                \e[90m⛰️ Stone\e[0m
                   |
                   |
   \e[31m🔥 Flame\e[0m ---- ✦ Center ✦ ---- \e[33m⭕ All\e[0m
                   |
                   |
                \e[34m🌊 River\e[0m
                   |
                   |
                \e[37m✦ Neutral\e[0m
"
"
                \e[33m⭕ All\e[0m
                   |
                   |
   \e[90m⛰️ Stone\e[0m ---- ✦ Center ✦ ---- \e[34m🌊 River\e[0m
                   |
                   |
                \e[37m✦ Neutral\e[0m
                   |
                   |
                \e[31m🔥 Flame\e[0m
"
"
                \e[34m🌊 River\e[0m
                   |
                   |
   \e[33m⭕ All\e[0m ---- ✦ Center ✦ ---- \e[31m🔥 Flame\e[0m
                   |
                   |
                \e[37m✦ Neutral\e[0m
                   |
                   |
                \e[90m⛰️ Stone\e[0m
"
)

# Crescendo effect: speed up then slow down
for speed in 1.5 1.2 1.0 0.8 0.6 0.8 1.0 1.2 1.5; do
  for frame in "${frames[@]}"; do
    clear
    echo -e "$frame"
    sleep $speed
  done
done

echo ""
echo "✨ Branches orbit in cosmic crescendo ✨"
echo ""
echo "🌌----- End of Anthology -----🌌"
