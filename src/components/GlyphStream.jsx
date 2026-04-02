import React, { useEffect, useState } from "react";
import "./GlyphStream.css"; // aura animations

export default function GlyphStream() {
  const [glyphs, setGlyphs] = useState([
    "✦ Covenant Affirmed ✦",
    "✦ Aura Resonance ✦",
    "✦ Stakeholder Ready ✦",
    "✦ Infrastructure Healing ✦",
    "✦ Motif Driven ✦",
    "✦ Spiritual Overlay ✦"
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % glyphs.length);
    }, 3000); // cycle every 3 seconds
    return () => clearInterval(interval);
  }, [glyphs.length]);

  return (
    <div className="glyph-stream">
      <h3 className="slogan-arc aura-heading aura-fade">
        {glyphs[currentIndex]}
      </h3>
    </div>
  );
}
