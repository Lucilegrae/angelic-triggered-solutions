import React from "react";
import "../theme.css";   // unified aura stylesheet

export default function Index() {
  return (
    <main className="glyph-card">
      {/* ✦ ATS Logo Reveal */}
      <img
        src="/logo.png"   // Vite serves assets directly from /public
        alt="Angelic Triggered Solutions Logo"
        className="ats-logo reveal"
      />

      {/* ✦ Banner Heading */}
      <h1 className="aura-heading reveal-delay">
        ✦ Angelic Triggered Solutions (ATS)
      </h1>
      <p className="pledge-line reveal">
        Under the banner of ATS, communities are structured as district cells —
        dependent initiatives drawing legitimacy, governance, and empowerment
        pipelines from ATS. Alongside these communities, small‑ to medium‑scale
        miners are empowered as key productive sectors, driving the economy and
        benefiting directly from ATS’s unified ecosystem.
      </p>

      {/* ✦ Purpose Section */}
      <section className="reveal">
        <h2 className="aura-heading">Purpose</h2>
        <p className="pledge-line">
          To secure government support for land allocation and structured
          settlement, enabling marginalized communities to be relocated into
          uplifted areas with proper housing, infrastructure, and entitlement
          frameworks. Simultaneously, to empower miners as productive
          stakeholders, ensuring they contribute to national growth while
          receiving protection and inclusion through ATS.
        </p>
      </section>

      {/* ✦ Communities Section */}
      <section className="reveal-delay">
        <h2 className="aura-heading">Communities as District Cells</h2>
        <ul>
          <li className="pledge-line">
            Dependence: Extensions of ATS aligned with housing, pension, and
            education.
          </li>
          <li className="pledge-line">
            Integration: Sequenced into ATS’s ceremonial workflows for unity and
            reproducibility.
          </li>
          <li className="pledge-line">
            Support: Governance, stakeholder engagement, and motif‑driven
            affirmation.
          </li>
        </ul>
      </section>

      {/* ✦ Miners Section */}
      <section className="reveal">
        <h2 className="aura-heading">Productive Sectors: Miners</h2>
        <p className="pledge-line">
          Small‑ to medium‑scale miners are empowered as vital contributors to
          national productivity, directly benefiting from ATS’s unified
          ecosystem.
        </p>
        <ul>
          <li className="pledge-line">Insurance: Protection against risks.</li>
          <li className="pledge-line">
            Banks: Financial inclusion and access to credit.
          </li>
          <li className="pledge-line">
            Stakeholder Legitimacy: Transparent frameworks affirming rights and
            responsibilities.
          </li>
          <li className="pledge-line">
            Community Engagement: Active participation in governance and
            development.
          </li>
        </ul>
      </section>

      {/* ✦ Outcomes Section */}
      <section className="reveal-delay">
        <h2 className="aura-heading">Outcomes</h2>
        <ul>
          <li className="pledge-line">
            A network of district cells unified under ATS.
          </li>
          <li className="pledge-line">
            Improved livability standards for marginalized communities.
          </li>
          <li className="pledge-line">
            Transparent entitlement frameworks for relocated beneficiaries.
          </li>
          <li className="pledge-line">
            Empowered miners contributing to national productivity.
          </li>
          <li className="pledge-line">
            A unified ecosystem binding social upliftment and economic
            empowerment.
          </li>
        </ul>
      </section>

      {/* ✦ Closing Affirmation */}
      <footer className="reveal">
        <h2 className="aura-heading">✦ Closing Affirmation</h2>
        <p className="pledge-line">
          ATS stands as the parent banner, with communities structured as
          district cells and miners empowered as productive sectors. Together,
          they form a unified ecosystem that promotes legitimacy, empowerment,
          and generational renewal.
        </p>
      </footer>
    </main>
  );
}
