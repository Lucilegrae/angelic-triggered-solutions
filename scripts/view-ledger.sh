#!/bin/bash
# ✦ Ritual Ledger + Scroll Anthology with Branch Blessing Counts, Motifs, and Rotating Poetic Separators ✦

if [ -f stub-log.txt ]; then
  echo "📜 Ritual Ledger Entries:"
  echo "-------------------------"
  cat stub-log.txt
else
  echo "⚠️ No ritual ledger found. Perform a commit or rebase first."
fi

echo ""
echo "🌟 Blessings Archive:"
echo "---------------------"

if [ -f benedictions.log ]; then
  branch=$(git rev-parse --abbrev-ref HEAD)
  now=$(date +'%Y-%m-%d %H:%M:%S')

  awk -v branch="$branch" -v now="$now" '
    BEGIN {count=0; branchColor="\033[33m"; barColor="\033[33m"}
    {
      count++
      if ($0 ~ /Flame/) {print "\033[31m🔥 Flame Benedictions 🔥\033[0m"; branchColor="\033[31m"; barColor="\033[31m"}
      else if ($0 ~ /Light/) {print "\033[36m✨ Light Benedictions ✨\033[0m"; branchColor="\033[36m"; barColor="\033[36m"}
      else if ($0 ~ /Path/) {print "\033[32m🌿 Path Benedictions 🌿\033[0m"; branchColor="\033[32m"; barColor="\033[32m"}
      else if ($0 ~ /Weekend/) {print "\033[33m🌞 Weekend Benedictions 🌙\033[0m"; branchColor="\033[33m"; barColor="\033[33m"}
      else if ($0 ~ /Weekday/) {print "\033[35m✦ Weekday Benedictions ✦\033[0m"; branchColor="\033[35m"; barColor="\033[35m"}
      print "Blessing #" count ": " $0
    }
    END {
      milestone=10
      label="🌟 Total Blessings Bestowed: "
      if (count >= 100) { milestone=100; label="✨ Legacy Immortal — " }
      else if (count >= 50) { milestone=100; label="🔥 Eternal Flame — " }
      else if (count >= 10) { milestone=50; label="🌟 Covenant Strong — " }

      progress=int((count/milestone)*20)
      percent=int((count/milestone)*100)
      bar=""
      for (i=0; i<20; i++) {
        if (i<progress) bar=bar"█"
        else bar=bar"░"
      }

      phrasePool["kindling"]="The flame is kindling|A spark awakens|The ember stirs"
      phrasePool["opening"]="The path is opening|The trail is marked|The covenant begins to unfold"
      phrasePool["rising"]="The light is rising|Radiance ascends|The dawn approaches"
      phrasePool["strength"]="The covenant is strong|Union is fortified|The vow holds firm"
      phrasePool["enduring"]="The eternal flame endures|The lineage perseveres|The blessing resounds"
      phrasePool["fulfilled"]="Legacy immortal, blessings fulfilled|The covenant is complete|The scroll is sealed"

      stage="kindling"
      if (percent>=10 && percent<25) stage="opening"
      else if (percent>=25 && percent<50) stage="rising"
      else if (percent>=50 && percent<75) stage="strength"
      else if (percent>=75 && percent<100) stage="enduring"
      else if (percent==100) stage="fulfilled"

      split(phrasePool[stage], variants, "|")
      srand()
      phrase=variants[int(rand()*length(variants))+1]

      print branchColor label count " Blessings\033[0m"
      print barColor "Progress to next milestone: [" bar "] " percent "% complete — " phrase "\033[0m"

      # Log phrase entry
      system("echo \"" now " — " branch " — " percent "% — " phrase "\" >> phrases.log")
    }
  ' benedictions.log

  # Rotating poetic separators for lineage aura
  case "$branch" in
    *light*)
      separators=("✦ Radiance ascends ✦" "✦ The dawn approaches ✦" "✦ Luminescence eternal ✦")
      ;;
    *flame*)
      separators=("🔥 Kindle the vow 🔥" "🔥 Ember of unity 🔥" "🔥 Flame unbroken 🔥")
      ;;
    *path*)
      separators=("🌿 The trail is marked 🌿" "🌿 Covenant unfolding 🌿" "🌿 Journey eternal 🌿")
      ;;
    *weekend*)
      separators=("🌞 Sun of rest 🌞" "🌞 Moon of peace 🌞" "🌞 Horizon of joy 🌞")
      ;;
    *weekday*)
      separators=("✨ Duty prevails ✨" "✨ Rhythm endures ✨" "✨ Stars guide ✨")
      ;;
    *)
      separators=("━━━━━━━━━━━━━━━━━━━━━━" "═══════ Covenant ═══════" "────────── Legacy ──────────")
      ;;
  esac

  header="----- $branch -----"
  count=$(grep -A1000 "^$header" phrases.log | grep -v "^$header" | grep "$branch" | wc -l)

  index=$((count % ${#separators[@]}))
  separator="${separators[$index]}"

  if ! grep -q "^$header" phrases.log; then
    echo "$separator" >> phrases.log
    echo "$header (0 Blessings)" >> phrases.log
    echo "$separator" >> phrases.log
  fi

  sed -i "s|^$header.*|$header ($count Blessings)|" phrases.log

  # Echo lineage tally with rotating separator
  echo ""
  echo "$separator"
  echo "📜 Lineage Tally for $branch: $count Blessings"
  echo "$separator"
else
  echo "⚠️ No benedictions archive found yet. Perform a commit or rebase to generate blessings."
fi
