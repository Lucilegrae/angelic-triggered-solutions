// EmpowermentArena.js
import React, { useState } from "react";
import "../theme.css";

export default function EmpowermentArena({ onArchive }) {
  const [auraIntensity, setAuraIntensity] = useState(0.5);
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(1);
  const [blessings, setBlessings] = useState(5);

  const presets = {
    Meditation: { aura: 0.3, vol: 0.2, spd: 0.7 },
    Celebration: { aura: 1, vol: 0.9, spd: 1.5 },
    Invocation: { aura: 0.6, vol: 0.5, spd: 1 }
  };

  const applyPreset = (presetName) => {
    const p = presets[presetName];
    setAuraIntensity(p.aura);
    setVolume(p.vol);
    setSpeed(p.spd);
  };

  const incrementBlessings = () => setBlessings(prev => prev + 1);
  const decrementBlessings = () => setBlessings(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="empowerment-arena">
      <h2 className="arena-header">✦ Empowerment Arena ✦</h2>
      <p className="arena-narration">
        Adjust aura intensity, sound, and constellation speed. Amplify blessings before sealing them into the covenant archive.
      </p>

      {/* Ritual Control Panel */}
      <div className="control-panel">
        <label>
          Aura Intensity
          <input type="range" min="0.1" max="1" step="0.1"
            value={auraIntensity}
            onChange={e => setAuraIntensity(parseFloat(e.target.value))} />
        </label>
        <label>
          Sound Volume
          <input type="range" min="0" max="1" step="0.1"
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))} />
        </label>
        <label>
          Constellation Speed
          <input type="range" min="0.5" max="2" step="0.1"
            value={speed}
            onChange={e => setSpeed(parseFloat(e.target.value))} />
        </label>
      </div>

      {/* Preset Buttons */}
      <div className="preset-panel">
        {Object.keys(presets).map(name => (
          <button key={name} className="all" onClick={() => applyPreset(name)}>
            {name}
          </button>
        ))}
      </div>

      {/* Blessing Controls */}
      <div className="blessing-controls">
        <button className="decrement" onClick={decrementBlessings}>➖</button>
        <span className="blessing-count">{blessings} blessings</span>
        <button className="increment" onClick={incrementBlessings}>➕</button>
      </div>

      {/* Archive Button */}
      <button className="archive-button all" onClick={() => onArchive(blessings)}>
        Archive Seal ✦
      </button>
    </div>
  );
}
