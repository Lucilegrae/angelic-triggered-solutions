import React, { useState } from "react";
import GlyphCard from "./GlyphCard";

export default function GlyphStream() {
  const [paused, setPaused] = useState(false);

  const glyphs = [
    {
      title: "Harare Southlands Settlement",
      description: "Transforming informal settlements into sustainable housing environments, backed by trusted guarantors and covenantal participation.",
      sound: "/chime.mp3"
    },
    {
      title: "Community Empowerment Programs",
      description: "Equipping communities with skills, resources, and ceremonial affirmation for sustainable growth and stakeholder resonance.",
      sound: "/chime.mp3"
    },
    {
      title: "Infrastructure Healing",
      description: "Blending technical precision with aura overlays to restore communal trust and create narratable, motif‑driven environments.",
      sound: "/chime.mp3"
    },
    {
      title: "Southlands Slum Restructuring",
      description: "Transforming informal settlements into sustainable, covenantal communities. Infrastructure healing meets expressive branding for stakeholder resonance.",
      sound: "/chime.mp3"
    },
    {
      title: "Mining Rights Expansion",
      description: "Extending approved mining rights by 45 hectares, ensuring sustainable extraction anchored in communal affirmation and covenantal stewardship.",
      sound: "/chime.mp3"
    },
    {
      title: "Urban Renewal Initiatives",
      description: "Revitalizing urban spaces with aura overlays, glow effects, and stakeholder‑ready storytelling. Every renewal is a glyph in our anthology.",
      sound: "/chime.mp3"
    }
  ];

  return (
    <div className="glyph-stream">
      <div
        className="glyph-stream-inner"
        style={{
          animationPlayState: paused ? "paused" : "running"
        }}
      >
        {glyphs.map((glyph, index) => (
          <GlyphCard
            key={index}
            title={glyph.title}
            description={glyph.description}
            sound={glyph.sound}
          />
        ))}
      </div>

      {/* Pause/Resume Controls */}
      <div style={{ marginTop: "1rem" }}>
        <button
          className="aura-button"
          onClick={() => setPaused(true)}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            background: "rgba(0,128,255,0.3)",
            border: "none",
            cursor: "pointer"
          }}
        >
          ✦ Pause Stream ✦
        </button>
        <button
          className="aura-button"
          onClick={() => setPaused(false)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            background: "rgba(0,255,128,0.3)",
            border: "none",
            cursor: "pointer"
          }}
        >
          ✦ Resume Stream ✦
        </button>
      </div>
    </div>
  );
}
