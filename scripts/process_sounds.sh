#!/data/data/com.termux/files/usr/bin/bash

# Flame – natural loop
sox flame_raw.mp3 /public/sounds/flame.mp3 \
  trim 0 5 fade t 0.2 5 0.2 gain -n -1

# River – natural loop
sox river_raw.mp3 /public/sounds/river.mp3 \
  trim 0 5 fade t 0.2 5 0.2 gain -n -1

# Stone – cavern echo
sox stone_raw.mp3 /public/sounds/stone.mp3 \
  trim 0 3 fade t 0.2 3 0.2 gain -n -1 echo 0.5 0.4

# Ouroboros – ambient drone
sox ouroboros_raw.mp3 /public/sounds/ouroboros.mp3 \
  trim 0 7 fade t 0.2 7 0.2 gain -n -1

# Celestial – hall reverb
sox celestial_raw.mp3 /public/sounds/celestial.mp3 \
  trim 0 3 fade t 0.2 3 0.2 gain -n -1 reverb 50 50 100 100 0

# Chime – short golden tone
sox chime_raw.mp3 /public/sounds/chime.mp3 \
  trim 0 2 fade t 0.1 2 0.1 gain -n -1 reverb 40 40 80 80 0

# Tooltip Silence – solemn bell with echo
sox silence_raw.mp3 /public/sounds/tooltip-silence.mp3 \
  trim 0 3 fade t 0.2 3 0.2 gain -n -1 echo 0.5 0.4 2.0

# Tooltip Restore – crisp wind chime
sox restore_raw.mp3 /public/sounds/tooltip-restore.mp3 \
  trim 0 2 fade t 0.1 2 0.1 gain -n -1
