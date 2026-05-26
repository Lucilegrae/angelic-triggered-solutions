#!/bin/bash
CREST_DIR=~/angelic-triggered-solutions/angelic-triggered-solutions/public/images/crests
OUTPUT_HTML=~/angelic-triggered-solutions/angelic-triggered-solutions/public/constellation.html

cat > $OUTPUT_HTML <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Golden Crest Constellation</title>
<style>
  body {
    background: radial-gradient(circle, #000000 0%, #1a1a1a 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .constellation {
    position: relative;
    width: 800px;
    height: 800px;
    border-radius: 50%;
  }
  .center-star {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    transform: translate(-50%, -50%);
    animation: starPulse 6s infinite ease-in-out;
  }
  .orbit {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    margin: -300px 0 0 -300px;
    border-radius: 50%;
    animation: orbitRotate 60s linear infinite;
  }
  .crest {
    position: absolute;
    width: 100px;
    top: 50%;
    left: 50%;
    margin: -50px;
    animation: crestGlow 8s infinite ease-in-out;
    filter: drop-shadow(0 0 10px gold);
  }
  @keyframes orbitRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes crestGlow {
    0%, 100% { filter: drop-shadow(0 0 10px gold); }
    50% { filter: drop-shadow(0 0 25px #ffd700); }
  }
  @keyframes starPulse {
    0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
  }

  .crest-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: center;
    text-align: center;
  }

  .blessing {
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 215, 0, 0.85);
    color: black;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 12px;
    font-family: "Georgia", serif;
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
    white-space: nowrap;
  }

  .crest-wrapper:hover .blessing {
    opacity: 1;
  }
</style>
</head>
<body>
<div class="constellation">
  <img src="images/crests/golden_star.png" class="center-star" />
  <div class="orbit">
EOF

# Place crests evenly spaced around orbit with hover blessings
declare -A CRESTS
CRESTS=(
  ["banking_crest.png"]="Prosperity through trust"
  ["insurance_policy_crest.png"]="Protection and assurance"
  ["veterans_crest.png"]="Honor and sacrifice"
  ["miners_crest.png"]="Strength from the earth"
  ["housing_members_crest.png"]="Shelter and unity"
  ["community_crest.png"]="Together we rise"
  ["councils_crest.png"]="Wisdom in governance"
  ["landowners_crest.png"]="Stewardship of the land"
  ["cement_crest.png"]="Foundation of progress"
  ["steel_crest.png"]="Forged in resilience"
  ["government_crest.png"]="Authority with balance"
  ["private_partners_crest.png"]="Collaboration for growth"
)

angle=0
for crest in "${!CRESTS[@]}"; do
  blessing="${CRESTS[$crest]}"
  echo "    <div class=\"crest-wrapper\" style=\"transform: rotate(${angle}deg) translate(300px) rotate(-${angle}deg);\">" >> $OUTPUT_HTML
  echo "      <img src=\"images/crests/$crest\" class=\"crest\" />" >> $OUTPUT_HTML
  echo "      <div class=\"blessing\">$blessing</div>" >> $OUTPUT_HTML
  echo "    </div>" >> $OUTPUT_HTML
  angle=$((angle+30))
done

cat >> $OUTPUT_HTML <<EOF
  </div>
</div>
</body>
</html>
EOF
