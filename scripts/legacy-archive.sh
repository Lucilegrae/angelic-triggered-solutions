#!/bin/bash
# legacy-archive.sh — logs ceremonial cycle runs into a scroll-like anthology

archive_file="legacy-archive.log"
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

branches=("Flame" "River" "Stone" "All" "Neutral")

echo "" >> $archive_file
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> $archive_file
echo "✦ Legacy Archive Entry ✦" >> $archive_file
echo "Timestamp: $timestamp" >> $archive_file
echo "Cycle: Kubatana Covenant" >> $archive_file
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> $archive_file

for branch in "${branches[@]}"; do
  blessing_count=$(grep -c "$branch" $archive_file)
  echo "Branch: $branch — Blessing #$((blessing_count+1))" >> $archive_file
done

echo "✨ Covenant sealed and archived ✨" >> $archive_file
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" >> $archive_file
