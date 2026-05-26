#!/bin/bash
# Copy and rename crest assets into public/images/crests

SRC="$HOME/storage/downloads/Copilot Images"
DEST="$HOME/angelic-triggered-solutions/angelic-triggered-solutions/public/images/crests"

mkdir -p "$DEST"

# Banking
cp "$SRC/BANKING .jpeg" "$DEST/banking_crest.png"

# Insurance
cp "$SRC/INSURANCE.jpeg" "$DEST/insurance_policy_crest.png"

# Veterans
cp "$SRC/VETERANS.jpeg" "$DEST/veterans_crest.png"

# Miners
cp "$SRC/MINERS.jpeg" "$DEST/miners_crest.png"

# Housing
cp "$SRC/HOUSING.jpeg" "$DEST/housing_members_crest.png"

# Community
cp "$SRC/COMMUNITY.jpeg" "$DEST/community_crest.png"

# Councils
cp "$SRC/COUNCILS.jpeg" "$DEST/councils_crest.png"

# Landowners
cp "$SRC/LANDOWNERS.jpeg" "$DEST/landowners_crest.png"

# Cement
cp "$SRC/CEMENT.jpeg" "$DEST/cement_crest.png"

# Steel
cp "$SRC/STEEL.jpeg" "$DEST/steel_crest.png"

# Government
cp "$SRC/GOVERNMENT.jpeg" "$DEST/government_crest.png"

# Partners
cp "$SRC/PARTNERS.jpeg" "$DEST/private_partners_crest.png"
