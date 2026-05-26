import React, { useState, useEffect } from "react";
import "../theme.css";

export default function SealConstellationView({ sealLedger, branchFilter, onBranchChange }) {
  const [hoveredBranch, setHoveredBranch] = useState(null);
  const [hoveredCoords, setHoveredCoords] = useState({ x: 0, y: 0 });
  const [auraIntensity, setAuraIntensity] = useState(0.5);
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(1);
  const [overlayMode, setOverlayMode] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(branchFilter);
  const [presets, setPresets] = useState({
    Meditation: { aura: 0.3, vol: 0.2, spd: 0.7 },
    Celebration: { aura: 1, vol: 0.9, spd: 1.5 },
    Invocation: { aura: 0.6, vol: 0.5, spd: 1 }
  });
  const [newPresetName, setNewPresetName] = useState("");

  // Sync local state with external branchFilter
  useEffect(() => {
    setCurrentBranch(branchFilter);
  }, [branchFilter]);

  // Handle branch change internally and notify parent
  const handleBranchChange = (branch) => {
    setCurrentBranch(branch);
    if (onBranchChange) {
      onBranchChange(branch);
    }
  };

  // ✦ Soundtrack trigger with tempo sync
  useEffect(() => {
    const audioMap = {
      flame: "/sounds/flame.mp3",
      river: "/sounds/river.mp3",
      stone: "/sounds/stone.mp3",
      all: "/sounds/all.mp3",
      fusion: "/sounds/fusion.mp3"
    };

    const audio = new Audio(audioMap[branchFilter] || audioMap["all"]);
    audio.loop = true;
    audio.volume = volume;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [branchFilter, volume]);

  // ✦ Apply preset
  const applyPreset = (presetName) => {
    const p = presets[presetName];
    setAuraIntensity(p.aura);
    setVolume(p.vol);
    setSpeed(p.spd);
  };

  // ✦ Save new preset
  const savePreset = () => {
    if (newPresetName.trim() !== "") {
      setPresets({
        ...presets,
        [newPresetName]: { aura: auraIntensity, vol: volume, spd: speed }
      });
      setNewPresetName("");
    }
  };

  return (
    <div
      className={`constellation-container ${currentBranch}`}
      style={{
        "--aura-intensity": auraIntensity,
        "--tempo-speed": speed,
        "--tempo-volume": volume
      }}
    >
      <h3>✦ Branch-Colored Seal Constellation ✦</h3>

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
          <button key={name} onClick={() => applyPreset(name)}>{name}</button>
        ))}
      </div>

      {/* Save Custom Preset */}
      <div className="save-preset-panel">
        <input
          type="text"
          placeholder="Preset name..."
          value={newPresetName}
          onChange={e => setNewPresetName(e.target.value)}
        />
        <button onClick={savePreset}>Save Preset</button>
      </div>

      {/* Shared Covenant Anthology */}
      <div className="anthology-panel">
        <h4>✦ Covenant Anthology ✦</h4>
        <ul>
          {Object.keys(presets).map(name => {
            const p = presets[name];
            const crest = name.toLowerCase().includes("flame") ? "🔥" :
                          name.toLowerCase().includes("river") ? "💧" :
                          name.toLowerCase().includes("stone") ? "🪨" : "✦";
            return (
              <li key={name} className="anthology-entry">
                <span className="anthology-crest">{crest}</span>
                <strong>{name}</strong> — Aura: {p.aura}, Volume: {p.vol}, Speed: {p.spd}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Ritual Timeline */}
      <div className="preset-timeline">
        <h4>✦ Ritual Timeline ✦</h4>
        <svg width="800" height="150" className="timeline-svg">
          <line x1="50" y1="80" x2="750" y2="80" className="timeline-axis" />
          {Object.keys(presets).map((name, idx) => {
            const spacing = 700 / (Object.keys(presets).length + 1);
            const x = 50 + spacing * (idx + 1);
            const y = 80;
            const branchClass = name.toLowerCase().includes("flame") ? "flame" :
                                name.toLowerCase().includes("river") ? "river" :
                                name.toLowerCase().includes("stone") ? "stone" : "all";
            const crest = branchClass === "flame" ? "🔥" :
                          branchClass === "river" ? "💧" :
                          branchClass === "stone" ? "🪨" : "✦";

            return (
              <g key={name} className={`preset-star-group ${branchClass}`}>
                <circle cx={x} cy={y} r="15" className={`preset-star ${branchClass}`} />
                <text x={x} y={y} textAnchor="middle" dy=".3em" className="preset-text">{crest}</text>
                <title>{name} — Aura: {presets[name].aura}, Vol: {presets[name].vol}, Speed: {presets[name].spd}</title>
                <text x={x} y={y + 30} textAnchor="middle" className="preset-label">{name}</text>
                {idx > 0 && (
                  <line
                    x1={x}
                    y1={y}
                    x2={50 + spacing * idx}
                    y2={y}
                    className={`lineage-line ${branchClass}`}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Crest Legend Constellation Map */}
      <div className="legend-constellations">
        {["flame", "river", "stone", "all"].map(branch => {
          const branchPresets = Object.keys(presets).filter(name =>
            branch === "flame" ? name.toLowerCase().includes("flame") :
            branch === "river" ? name.toLowerCase().includes("river") :
            branch === "stone" ? name.toLowerCase().includes("stone") :
            !name.toLowerCase().includes("flame") &&
            !name.toLowerCase().includes("river") &&
            !name.toLowerCase().includes("stone")
          );

          const crest = branch === "flame" ? "🔥" :
                        branch === "river" ? "💧" :
                        branch === "stone" ? "🪨" : "✦";

          return (
            <div key={branch} className={`constellation-map ${branch}`}>
              <h5>{crest} {branch.charAt(0).toUpperCase() + branch.slice(1)} Constellation</h5>
              <svg width="300" height="150" className="branch-svg">
                {branchPresets.map((name, idx) => {
                  const spacing = 250 / (branchPresets.length + 1);
                  const x = 25 + spacing * (idx + 1);
                  const y = 75;
                  return (
                    <g key={name}>
                      <circle cx={x} cy={y} r="10" className={`preset-star ${branch}`} />
                      <text x={x} y={y + 20} textAnchor="middle" className="preset-label">{name}</text>
                      {idx > 0 && (
                        <line
                          x1={x}
                          y1={y}
                          x2={25 + spacing * idx}
                          y2={y}
                          className={`lineage-line ${branch}`}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          );
        })}
      </div>

      {/* Overlay Toggle */}
      <div className="overlay-toggle">
        <button onClick={() => setOverlayMode(!overlayMode)}>
          {overlayMode ? "🌌 Separate Maps" : "✨ Cosmic Overlay"}
        </button>
      </div>

      {/* Cosmic Overlay Constellation */}
      {overlayMode && (
        <div className="cosmic-overlay">
          <h4>✦ Grand Covenant Constellation ✦</h4>
          <svg width="800" height="300" className="overlay-svg">
            <line x1="50" y1="150" x2="750" y2="150" className="timeline-axis" />
            {Object.keys(presets).map((name, idx) => {
              const spacing = 700 / (Object.keys(presets).length + 1);
              const x = 50 + spacing * (idx + 1);
              const y = 150;
              const branchClass = name.toLowerCase().includes("flame") ? "flame" :
                                  name.toLowerCase().includes("river") ? "river" :
                                  name.toLowerCase().includes("stone") ? "stone" : "all";
              const crest = branchClass === "flame" ? "🔥" :
                            branchClass === "river" ? "💧" :
                            branchClass === "stone" ? "🪨" : "✦";

              return (
                <g key={name} className={`overlay-star-group ${branchClass}`}>
                  <circle cx={x} cy={y} r="12" className={`overlay-star ${branchClass} drifting`} />
                  <text x={x} y={y} textAnchor="middle" dy=".3em" className="overlay-text">{crest}</text>
                  {idx > 0 && (
                    <line
                      x1={x}
                      y1={y}
                      x2={50 + spacing * idx}
                      y2={y}
                      className={`overlay-line ${branchClass} aura-wave`}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Constellation SVG with Crest Hover */}
      <svg width="800" height="250" className="constellation-svg">
        <line x1="50" y1="120" x2="750" y2="120" className="timeline-axis" />

        {sealLedger.map((entry, idx) => {
          const spacing = 700 / (sealLedger.length + 1);
          const x = 50 + spacing * (idx + 1);
          const y = 120;
          const branchClass = entry.branch || "all";

          return (
            <g
              key={idx}
              className={`seal-star-group ${branchClass}`}
              onMouseEnter={() => {
                setHoveredBranch(branchClass);
                setHoveredCoords({ x, y });
              }}
              onMouseLeave={() => setHoveredBranch(null)}
              style={{ animationDuration: `${2 / speed}s` }}
            >
              <circle cx={x} cy={y} r="20" className={`seal-star ${branchClass} drifting`} />
              <text x={x} y={y} textAnchor="middle" dy=".3em" className="seal-text">
                {entry.glyph}
              </text>
              <title>{entry.timestamp} — {entry.blessings} blessings</title>
              <text x={x} y={y + 40} textAnchor="middle" className="seal-date">
                {entry.timestamp.split(",")[0]}
              </text>
              {idx > 0 && (
                <line
                  x1={x}
                  y1={y}
                  x2={50 + spacing * idx}
                  y2={y}
                  className={`seal-line ${branchClass} aura-wave`}
                  style={{ animationDuration: `${2 / speed}s` }}
                />
              )}
            </g>
          );
        })}

        {/* Crest hover effect */}
        {hoveredBranch && (
          <text
            x={hoveredCoords.x + 40}
            y={hoveredCoords.y - 40}
            className={`crest-hover ${hoveredBranch}`}
          >
            {hoveredBranch === "flame" ? "🔥" :
             hoveredBranch === "river" ? "💧" :
             hoveredBranch === "stone" ? "🪨" : "✦"}
          </text>
        )}
      </svg>

      {/* Branch Selector and Seal Grid */}
      <div className="branch-selector">
        <button onClick={() => handleBranchChange("flame")}>🔥 Flame</button>
        <button onClick={() => handleBranchChange("river")}>💧 River</button>
        <button onClick={() => handleBranchChange("stone")}>🪨 Stone</button>
        <button onClick={() => handleBranchChange("all")}>✦ All</button>
      </div>

      <div className="seal-grid">
        {sealLedger
          .filter(seal => currentBranch === "all" || seal.branch === currentBranch)
          .map((seal, index) => (
            <div key={index} className={`seal-item ${seal.branch}`}>
              <span className="seal-glyph">{seal.glyph}</span>
              <span className="seal-info">
                {seal.timestamp} — Blessings: {seal.blessings}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
