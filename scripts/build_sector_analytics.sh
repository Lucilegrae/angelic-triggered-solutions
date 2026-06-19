#!/bin/bash

PROFILE_DIR="public/certificates/insurance/profiles"
INDEX_FILE="public/certificates/insurance/profiles_index.json"
OUT_JSON="public/certificates/insurance/sector_analytics.json"

if [ ! -f "$INDEX_FILE" ]; then
  echo "Index not found: $INDEX_FILE"
  exit 1
fi

tmp=$(mktemp)
echo "[" > "$tmp"
first=1

for uuid in $(jq -r '.[]' "$INDEX_FILE"); do
  file="$PROFILE_DIR/$uuid.json"
  if [ -f "$file" ]; then
    if [ $first -eq 0 ]; then
      echo "," >> "$tmp"
    fi
    jq '.' "$file" >> "$tmp"
    first=0
  fi
done

echo "]" >> "$tmp"

jq '
  reduce .[] as $p (
    {};
    ($p.sector // "community-members") as $sector |
    ($p.subscription_amount // 0 | tonumber) as $monthly |
    ($p.registered_at // "2026-01-01") as $start |

    ($start | split("-")[0] // "2026" | tonumber) as $year |
    ($start | split("-")[1] // "01" | tonumber) as $month |
    (now | strftime("%Y") | tonumber) as $cy |
    (now | strftime("%m") | tonumber) as $cm |

    ((($cy - $year) * 12) + ($cm - $month)) as $months |
    (if $months < 0 then 0 else $months end) as $months2 |

    ($monthly * $months2) as $totalPaid |
    ($totalPaid * 1.05) as $projected |

    .[$sector] |= (
      . // {
        members: 0,
        total_paid: 0,
        projected_maturity: 0,
        avg_monthly: 0
      } |
      .members += 1 |
      .total_paid += $totalPaid |
      .projected_maturity += $projected
    )
  ) |
  with_entries(
    .value.avg_monthly =
      (if .value.members > 0
       then (.value.total_paid / (.value.members * 12))
       else 0 end)
  )
' "$tmp" > "$OUT_JSON"

rm "$tmp"

echo "✅ Sector analytics written to: $OUT_JSON"
