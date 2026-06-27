import React from "react";

export default function GlyphCard({ title, description, sound }) {
  const playSound = () => {
    if (sound) {
      const audio = new Audio(sound);
      audio.play();
    }
  };

  return (
    <div
      className="glyph-card"
      onMouseEnter={playSound}
    >
      <h2 className="slogan-arc aura-heading">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
