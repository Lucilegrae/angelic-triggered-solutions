import React, { useEffect, useState } from "react";
import "./GlyphStream.css";

export default function GlyphStream() {
  const [glyphs] = useState([
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
    }, 3000);
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

