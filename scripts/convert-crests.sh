#!/data/data/com.termux/files/usr/bin/bash

# Navigate to project root
cd ~/angelic-triggered-solutions/angelic-triggered-solutions

# Output folder for base64 strings
mkdir -p ./base64_crests

# Convert each crest PNG into base64 text
for crest in banking_crest.png veterans_crest.png miners_crest.png \
             housing_members_crest.png landowners_crest.png cement_crest.png \
             steel_crest.png government_crest.png private_partners_crest.png \
             community_crest.png councils_crest.png insurance_policy_crest.png \
             golden_star_crest.png
do
  echo "Converting $crest..."
  base64 ./images/crests/$crest > ./base64_crests/${crest%.png}.txt
done

echo "✨ All crests converted to base64 and saved in ./base64_crests/"
