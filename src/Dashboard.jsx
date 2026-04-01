import React from "react";
import "./theme.css";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard aura-bg">
      {/* Covenant Heading */}
      <h1 className="slogan-arc aura-heading">
        ✦ Stakeholder Dashboard ✦
      </h1>

      {/* Affirmations Section */}
      <section>
        <h2 className="slogan-arc aura-heading">Affirmations</h2>
        <AffirmationsList />
      </section>

      {/* Projects Section */}
      <section>
        <h2 className="slogan-arc aura-heading">Projects</h2>
        <ProjectsList />
      </section>

      {/* Stakeholders Section */}
      <section>
        <h2 className="slogan-arc aura-heading">Stakeholders</h2>
        <StakeholdersList />
      </section>

      {/* Covenant Closing Arc */}
      <p className="pledge-line">
        ✦ Every affirmation, project, and stakeholder is a glyph in our anthology — covenantally affirmed ✦
      </p>
    </main>
  );
}
