import React from "react";
import ProjectCard from "../components/ProjectCard";

function Projects() {
  return (
    <div className="projects-container">
      <ProjectCard
        title="Harare Southlands Housing"
        description="Modular housing blocks with solar integration."
        auraClass="project-aura-blue"
      />
      <ProjectCard
        title="River Rehabilitation"
        description="Expanded pumps, lighting, and communal dashboards."
        auraClass="project-aura-green"
      />
      <ProjectCard
        title="Investor Decks"
        description="Stakeholder-ready visuals and phased rollout plans."
        auraClass="project-aura-gold"
      />
      <ProjectCard
        title="Community Engagement"
        description="Ceremonial Q&A, pledge lines, and communal affirmation."
        auraClass="project-aura-purple"
      />
    </div>
  );
}

export default Projects;
