import React, { useEffect, useState } from "react";
import "../theme.css";

export default function CosmicWheel() {
  const [volume, setVolume] = useState(0.5); // default 50%
  const [muted, setMuted] = useState(false);

  const branches = [
    { name: "Flame", blessings: 12, tooltip: "Eternal Phoenix Rises", img: "/flame-banner.png", sound: "/sounds/flame.mp3" },
    { name: "River", blessings: 10, tooltip: "Dolphin Constellation Shimmers", img: "/river-banner.png", sound: "/sounds/river.mp3" },
    { name: "Stone", blessings: 8, tooltip: "Capricorn Ascends", img: "/stone-banner.png", sound: "/sounds/stone.mp3" },
    { name: "All", blessings: 14, tooltip: "Sunfire Ouroboros Awakens", img: "/all-banner.png", sound: "/sounds/ouroboros.mp3" },
    { name: "Neutral", blessings: 6, tooltip: "Celestial Balance Glows", img: "/neutral-banner.png", sound: "/sounds/celestial.mp3" },
  ];

  useEffect(() => {
    // Blessing counters animate upward
    const counters = document.querySelectorAll(".blessings span");
    counters.forEach((counter) => {
      let target = parseInt(counter.textContent, 10);
      let count = 0;
      const step = Math.ceil(target / 50);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(interval);
        }
        counter.textContent = count;
      }, 50);
    });

    // Branch reveal sounds (staggered)
    branches.forEach((b, index) => {
      const audio = new Audio(b.sound);
      audio.volume = muted ? 0 : volume;
      setTimeout(() => {
        audio.play();
      }, 2000 * index + 500);
    });

    // Heartbeat chime synced with sigil pulse
    const chime = new Audio("/sounds/chime.mp3");
    chime.volume = muted ? 0 : volume;
    const playChime = () => {
      chime.currentTime = 0;
      chime.play();
    };
    const interval = setInterval(playChime, 300000); // every 5 minutes
    return () => clearInterval(interval);
  }, [volume, muted]);

  // Tooltip chime with distinct motifs
  const playTooltipChime = () => {
    if (!muted) {
      const audio = new Audio(
        muted ? "/sounds/tooltip-restore.mp3" : "/sounds/tooltip-silence.mp3"
      );
      audio.volume = volume;
      audio.play();
    }
  };

  return (
    <section className="cosmic-wheel">
      <div className={`center-sigil ${muted ? "sound-off" : "sound-on"}`}>
        <h1>Kubatana</h1>
        <h2>Legacy Anthology</h2>
        <p>Harmony in the Circle of Five</p>
      </div>

      {/* Volume Control */}
      <div className="volume-control">
        <label htmlFor="volume">Ceremonial Volume</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          disabled={muted}
        />
        <button
          onClick={() => setMuted(!muted)}
          onMouseEnter={playTooltipChime} // distinct tone depending on state
          data-tooltip={muted ? "Restore resonance" : "Silence the covenant"}
        >
          {muted ? "Unmute Ceremony" : "Mute Ceremony"}
        </button>
      </div>

      {branches.map((b) => (
        <div key={b.name} className={`branch ${b.name.toLowerCase()}`} data-tooltip={b.tooltip}>
          <img src={b.img} alt={`${b.name} Branch`} />
          <h3>{b.name} Branch</h3>
          <p className="blessings">
            Blessings: <span>{b.blessings}</span>
          </p>
        </div>
      ))}
    </section>
  );
}
