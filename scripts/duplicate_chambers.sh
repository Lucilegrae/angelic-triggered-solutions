#!/bin/bash
# duplicate_chambers.sh
# Duplicate Veterans Chamber template for all stakeholders

STAKEHOLDERS=("banking" "miners" "housing" "landowners" "cement" "steel" "government" "partners")

for s in "${STAKEHOLDERS[@]}"; do
  cp public/veterans.html public/$s.html
  sed -i "s/veterans/$s/g" public/$s.html
  echo "✅ Created: $s.html"
done

echo "✨ All stakeholder chambers duplicated and updated."
