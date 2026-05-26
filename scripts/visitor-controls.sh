#!/bin/bash
# visitor-controls.sh
# Toggle mute/volume for ceremonial playback

ENV_FILE=~/angelic-triggered-solutions/angelic-triggered-solutions/sound.env

case "$1" in
  mute)
    sed -i 's/^export VISITOR_MUTE=.*/export VISITOR_MUTE=true/' "$ENV_FILE"
    echo "[Visitor Control] Mute enabled | Timestamp: $(date)" >> ~/angelic-triggered-solutions/phrases.log
    ;;
  unmute)
    sed -i 's/^export VISITOR_MUTE=.*/export VISITOR_MUTE=false/' "$ENV_FILE"
    echo "[Visitor Control] Mute disabled | Timestamp: $(date)" >> ~/angelic-triggered-solutions/phrases.log
    ;;
  volume)
    if [ -n "$2" ]; then
      sed -i "s/^export VISITOR_VOLUME=.*/export VISITOR_VOLUME=$2/" "$ENV_FILE"
      echo "[Visitor Control] Volume set to $2% | Timestamp: $(date)" >> ~/angelic-triggered-solutions/phrases.log
    else
      echo "Usage: $0 volume <percent>"
    fi
    ;;
  *)
    echo "Usage: $0 {mute|unmute|volume <percent>}"
    ;;
esac
