import React from "react";

export default function SoundToggle({ activeTab, soundEnabled, setSoundEnabled }) {
  return (
    <div style={{ textAlign: "right", marginBottom: "1rem" }}>
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="tab-btn sound-toggle"
        style={{ display: "inline-flex", alignItems: "center" }}
      >
        {soundEnabled ? "🔊 Mute Ritual Sounds" : "🔈 Unmute Ritual Sounds"}
        <span
          className={`sound-indicator ${
            soundEnabled
              ? activeTab === "projects"
                ? "sound-on-projects"
                : activeTab === "stakeholders"
                ? "sound-on-stakeholders"
                : "sound-on-affirmations"
              : "sound-off"
          }`}
        ></span>
      </button>
    </div>
  );
}
