import React from "react";
import "./../theme.css";

export default function Contact() {
  return (
    <section
      className="aura-bg"
      style={{
        padding: "4rem 2rem",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >
      {/* Covenant Heading */}
      <h1 className="slogan-arc aura-heading" style={{ marginBottom: "2rem" }}>
        ✦ Contact Angelic Triggered Solutions ✦
      </h1>

      {/* Pledge Line */}
      <p
        className="pledge-line"
        style={{
          maxWidth: "900px",
          margin: "0 auto 2rem",
          fontSize: "16px",
          lineHeight: "1.8"
        }}
      >
        Every communication is a covenantal glyph — narratable, motif‑driven, and spiritually resonant.  
        We pledge transparency and accessibility. Reach out for stakeholder dialogue, communal affirmation, or project collaboration.
      </p>

      {/* Glyph Cards for Contact Details */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          justifyContent: "center",
          marginTop: "2rem"
        }}
      >
        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Head Office</h2>
          <p>
            Angelic Triggered Solutions Pvt Ltd  
            5 Elephant Close, Borrowdale West, Harare, Zimbabwe
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Phone</h2>
          <p>
            +263 785 002 561  
            +263 779 129 187
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Email</h2>
          <p>
            info@angelictriggeredsolutions.co.zw  
            pnovontony@yahoo.com
          </p>
        </div>

        <div className="glyph-card">
          <h2 className="slogan-arc aura-heading">Political Partner</h2>
          <p>
            Regis Muzembe — Associated with Angelic Triggered Solutions Pvt Ltd  
            Harare Southlands Slum Restructuring Project
          </p>
        </div>
      </div>

      {/* Closing Arc */}
      <p
        className="pledge-line"
        style={{
          marginTop: "3rem",
          fontSize: "14px",
          opacity: "0.85"
        }}
      >
        ✦ Each contact is a covenantal arc — affirming trust, resonance, and communal participation. ✦
      </p>
    </section>
  );
}
