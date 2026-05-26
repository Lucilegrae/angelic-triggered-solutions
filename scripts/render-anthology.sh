#!/bin/bash
# render-anthology.sh
# Generates ceremonial anthology scroll HTML with Circle of Five

INPUT_FILE=~/angelic-triggered-solutions/anthology-scroll.log
OUTPUT_FILE=~/angelic-triggered-solutions/anthology-scroll.html

cat <<EOF > "$OUTPUT_FILE"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Ceremonial Anthology Scroll</title>
<style>
body {
  font-family: "Georgia", serif;
  background: #0b0c10;
  color: #fdf6e3;
  padding: 40px;
  line-height: 1.6;
  overflow: hidden;
}

/* Cosmic shimmer background */
.cosmic-background {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(circle at 30% 30%, rgba(255,215,0,0.2), transparent),
              radial-gradient(circle at 70% 70%, rgba(138,43,226,0.2), transparent),
              radial-gradient(circle at 50% 90%, rgba(0,191,255,0.2), transparent);
  background-size: cover;
  pointer-events: none;
  z-index: -1;
  animation: shimmerPulse 25s infinite alternate;
}
@keyframes shimmerPulse {
  0%   { opacity: 0.4; filter: blur(2px); }
  50%  { opacity: 0.8; filter: blur(4px); }
  100% { opacity: 0.5; filter: blur(3px); }
}

/* Circle layout */
.circle-layout {
  position: relative;
  width: 500px;
  height: 500px;
  margin: 0 auto;
}

.central-emblem {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.branch {
  position: absolute;
  width: 120px;
  text-align: center;
}
.branch img {
  max-width: 100px;
  filter: drop-shadow(0 0 6px gold);
}

/* Orbital positions + speeds */
.flame      { animation: orbitFlame 20s linear infinite; }
.river      { animation: orbitRiver 40s linear infinite; }
.stone      { animation: orbitStone 60s linear infinite; }
.ouroboros  { animation: orbitOuroboros 50s linear infinite; }
.celestial  { animation: orbitCelestial 30s linear infinite; }

/* Orbit keyframes */
@keyframes orbitFlame {
  from { transform: rotate(0deg) translateY(-200px) rotate(0deg); }
  to   { transform: rotate(360deg) translateY(-200px) rotate(-360deg); }
}
@keyframes orbitRiver {
  from { transform: rotate(0deg) translateY(-200px) rotate(0deg); }
  to   { transform: rotate(360deg) translateY(-200px) rotate(-360deg); }
}
@keyframes orbitStone {
  from { transform: rotate(0deg) translateY(-200px) rotate(0deg); }
  to   { transform: rotate(360deg) translateY(-200px) rotate(-360deg); }
}
@keyframes orbitOuroboros {
  from { transform: rotate(0deg) translateY(-200px) rotate(0deg); }
  to   { transform: rotate(360deg) translateY(-200px) rotate(-360deg); }
}
@keyframes orbitCelestial {
  from { transform: rotate(0deg) translateY(-200px) rotate(0deg); }
  to   { transform: rotate(360deg) translateY(-200px) rotate(-360deg); }
}

/* Spark trails */
.branch::after {
  content: "";
  position: absolute;
  width: 8px; height: 8px;
  border-radius: 50%;
  opacity: 0.7;
  animation: sparkTrail 3s infinite;
}
.flame::after { background: orange; box-shadow: 0 0 12px red; }
.river::after { background: deepskyblue; box-shadow: 0 0 12px blue; }
.stone::after { background: silver; box-shadow: 0 0 12px gray; }
.ouroboros::after { background: limegreen; box-shadow: 0 0 12px green; }
.celestial::after { background: violet; box-shadow: 0 0 12px purple; }
@keyframes sparkTrail {
  0%   { transform: translate(0,0) scale(0.5); opacity:0.8; }
  50%  { transform: translate(20px,-20px) scale(1); opacity:1; }
  100% { transform: translate(40px,-40px) scale(0.3); opacity:0; }
}

/* Sound controls */
.sound-controls {
  text-align: center;
  margin-top: 20px;
}
.sound-button {
  background: goldenrod;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 6px;
  color: #0b0c10;
  font-weight: bold;
}
.sound-button:hover { background: #ffd700; }
</style>
</head>
<body>
<div class="cosmic-background"></div>

<h1 style="text-align:center; color:goldenrod;">✨ Ceremonial Anthology Scroll ✨</h1>

<div class="circle-layout">
  <!-- Central Golden Star Crest -->
  <div class="central-emblem">
    <img src="/banners/golden-star-crest.png" alt="Golden Star Crest">
    <div class="separator">🌟 Golden Star of Harmony 🌟</div>
  </div>

  <!-- Branch Crests -->
  <div class="branch flame">
    <img src="/banners/flame-crest.png" alt="Flame Crest">
    <div>🔥 Flame Branch</div>
  </div>
  <div class="branch river">
    <img src="/banners/river-crest.png" alt="River Crest">
    <div>💧 River Branch</div>
  </div>
  <div class="branch stone">
    <img src="/banners/stone-crest.png" alt="Stone Crest">
    <div>🪨 Stone Branch</div>
  </div>
  <div class="branch ouroboros">
    <img src="/banners/ouroboros-crest.png" alt="Ouroboros Crest">
    <div>🐍 Ouroboros Branch</div>
  </div>
  <div class="branch celestial">
    <img src="/banners/celestial-crest.png" alt="Celestial Crest">
    <div>✨ Celestial Branch</div>
  </div>
</div>

<!-- Sound Motifs -->
<audio id="flameSound" src="/sounds/flame-crackle.mp3" loop></audio>
<audio id="riverSound" src="/sounds/river-ripple.mp3" loop></audio>
<audio id="stoneSound" src="/sounds/stone-resonance.mp3" loop></audio>
<audio id="ouroborosSound" src="/sounds/serpent-hiss.mp3" loop></audio>
<audio id="celestialSound" src="/sounds/celestial-chime.mp3" loop></audio>

<div class="sound-controls">
  <button class="sound-button" onclick="toggleSound('flameSound')">🔥 Flame</button>
  <button class="sound-button" onclick="toggleSound('riverSound')">💧 River</button>
  <button class="sound-button" onclick="toggleSound('stoneSound')">🪨 Stone</button>
  <button class="sound-button" onclick="toggleSound('ouroborosSound')">🐍 Ouroboros</button>
  <button class="sound-button" onclick="toggleSound('celestialSound')">✨ Celestial</button>
  <button class="sound-button" onclick="toggleAllSounds()">🔇 Toggle All</button>
</div>

<script>
function toggleSound(id) {
  const audio = document.getElementById(id);
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function toggleAllSounds() {
  const sounds = ['flameSound','riverSound','stoneSound','ouroborosSound','celestialSound'];
  let anyPlaying = sounds.some(id => !document.getElementById(id).paused);
  sounds.forEach(id => {
    const audio = document.getElementById(id);
    if (anyPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  });
}
</script>

</body>
</html>
EOF
