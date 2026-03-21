import React, { useState } from "react";
import GlyphCard from "./GlyphCard";
import jsPDF from "jspdf";

export default function GlyphStream() {
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState("normal");
  const [speed, setSpeed] = useState("30s");
  const [focusedGlyphs, setFocusedGlyphs] = useState([]);

  const glyphs = [
    { title: "Harare Southlands Settlement", description: "Transforming informal settlements into sustainable housing environments, backed by trusted guarantors and covenantal participation.", sound: "/chime.mp3" },
    { title: "Community Empowerment Programs", description: "Equipping communities with skills, resources, and ceremonial affirmation for sustainable growth and stakeholder resonance.", sound: "/chime.mp3" },
    { title: "Infrastructure Healing", description: "Blending technical precision with aura overlays to restore communal trust and create narratable, motif‑driven environments.", sound: "/chime.mp3" },
    { title: "Southlands Slum Restructuring", description: "Transforming informal settlements into sustainable, covenantal communities. Infrastructure healing meets expressive branding for stakeholder resonance.", sound: "/chime.mp3" },
    { title: "Mining Rights Expansion", description: "Extending approved mining rights by 45 hectares, ensuring sustainable extraction anchored in communal affirmation and covenantal stewardship.", sound: "/chime.mp3" },
    { title: "Urban Renewal Initiatives", description: "Revitalizing urban spaces with aura overlays, glow effects, and stakeholder‑ready storytelling. Every renewal is a glyph in our anthology.", sound: "/chime.mp3" }
  ];

  const toggleFocus = (glyph) => {
    setPaused(true);
    if (focusedGlyphs.includes(glyph)) {
      setFocusedGlyphs(focusedGlyphs.filter(g => g !== glyph));
    } else {
      setFocusedGlyphs([...focusedGlyphs, glyph]);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("✦ Collective Glyph Focus ✦", 20, 20);

    let y = 40;
    focusedGlyphs.forEach((glyph, index) => {
      doc.setFontSize(14);
      doc.text(`${glyph.title}`, 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(doc.splitTextToSize(glyph.description, 170), 20, y);
      y += 20;
    });

    // Communal signature lines
    y += 20;
    doc.setFontSize(14);
    doc.text("✦ Stakeholder Affirmation ✦", 20, y);
    y += 15;
    doc.setFontSize(12);
    doc.text("Signature: ___________________________", 20, y);
    y += 15;
    doc.text("Name: _______________________________", 20, y);
    y += 15;
    doc.text("Date: _______________________________", 20, y);

    doc.save("glyph-gallery.pdf");
  };

  return (
    <div className="glyph-stream">
      {focusedGlyphs.length > 0 ? (
        <div className="glyph-gallery">
          <h2 className="slogan-arc aura-heading">✦ Collective Glyph Focus ✦</h2>
          <div className="glyph-gallery-inner">
            {focusedGlyphs.map((glyph, index) => (
              <div key={index} className="glyph-focus">
                <h3 className="slogan-arc aura-heading">{glyph.title}</h3>
                <p>{glyph.description}</p>
              </div>
            ))}
          </div>
          <button className="aura-button" onClick={exportPDF}>
            ✦ Export Gallery as PDF ✦
          </button>
          <button
            className="aura-button"
            onClick={() => {
              setFocusedGlyphs([]);
              setPaused(false);
            }}
          >
            ✦ Close Gallery ✦
          </button>
        </div>
      ) : (
        <>
          <div
            className="glyph-stream-inner"
            style={{
              animationPlayState: paused ? "paused" : "running",
              animationDirection: direction,
              animationDuration: speed
            }}
          >
            {glyphs.map((glyph, index) => (
              <div key={index} onClick={() => toggleFocus(glyph)}>
                <GlyphCard
                  title={glyph.title}
                  description={glyph.description}
                  sound={glyph.sound}
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div style={{ marginTop: "1rem" }}>
            <button className="aura-button" onClick={() => setPaused(true)}>✦ Pause ✦</button>
            <button className="aura-button" onClick={() => setPaused(false)}>✦ Resume ✦</button>
            <button className="aura-button" onClick={() => setDirection("normal")}>✦ Flow Right ✦</button>
            <button className="aura-button" onClick={() => setDirection("reverse")}>✦ Flow Left ✦</button>
            <button className="aura-button" onClick={() => setSpeed("60s")}>✦ Slow Flow ✦</button>
            <button className="aura-button" onClick={() => setSpeed("15s")}>✦ Fast Flow ✦</button>
          </div>
        </>
      )}
    </div>
  );
}
