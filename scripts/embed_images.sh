#!/data/data/com.termux/files/usr/bin/bash

# Navigate to project root
cd ~/angelic-triggered-solutions/angelic-triggered-solutions

# Output folder for base64 strings
mkdir -p ./base64_crests

# Correct image directory
IMAGE_DIR="./public/images/crests"

# Convert each crest PNG into base64 text
for crest in banking_crest.png veterans_crest.png miners_crest.png \
             housing_members_crest.png landowners_crest.png cement_crest.png \
             steel_crest.png government_crest.png private_partners_crest.png \
             community_crest.png councils_crest.png insurance_policy_crest.png
do
  if [ -f "$IMAGE_DIR/$crest" ]; then
    echo "Converting $crest..."
    base64 "$IMAGE_DIR/$crest" > ./base64_crests/${crest%.png}.txt
  else
    echo "Missing: $IMAGE_DIR/$crest"
  fi
done

# Handle Golden Star Crest separately (in banners folder)
if [ -f "./public/banners/golden-star-crest.png" ]; then
  echo "Converting golden-star-crest.png..."
  base64 ./public/banners/golden-star-crest.png > ./base64_crests/golden_star_crest.txt
else
  echo "Missing: ./public/banners/golden-star-crest.png"
fi

echo "Conversion complete. Base64 files are in ./base64_crests/"
