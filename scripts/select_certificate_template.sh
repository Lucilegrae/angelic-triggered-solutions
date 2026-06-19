#!/bin/bash

SECTOR=$(echo "$1" | tr '[:upper:]' '[:lower:]')

case "$SECTOR" in
  community* ) echo "templates/community_template.png" ;;
  veterans* ) echo "templates/veterans_template.png" ;;
  mining* ) echo "templates/mining_template.png" ;;
  landowners* ) echo "templates/landowners_template.png" ;;
  partners* ) echo "templates/partners_template.png" ;;
  steel* ) echo "templates/steel_template.png" ;;
  * ) echo "" ;;
esac
