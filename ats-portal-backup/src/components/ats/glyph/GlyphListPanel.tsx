"use client";

import { useGlyphList } from "@/hooks/api/glyph/useGlyphList";

export default function GlyphListPanel() {
  const { loading, pdfs, error } = useGlyphList();

  return (
    <div className="ats-panel">
      <h3 className="aura-heading">📜 Glyph PDFs</h3>

      {loading && <p>Loading glyphs...</p>}
      {error && <p className="error-text">{error}</p>}
      {pdfs && (
        <ul className="ats-list">
          {pdfs.map((p) => (
            <li key={p.id}>{p.filename}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
