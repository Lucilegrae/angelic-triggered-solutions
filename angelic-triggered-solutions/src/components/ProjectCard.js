import React, { useState } from "react";
import ProjectModal from "./ProjectModal";
import "./../theme.css";

function ProjectCard({ title, description, auraClass }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={`project-card ${auraClass}`} onClick={() => setIsOpen(true)}>
        <div className="project-overlay">
          <h3>{title}</h3>
          <p>{description}</p>
          <button className="project-btn">View Details</button>
        </div>
      </div>
      <ProjectModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
        aura={auraClass.replace("project-aura-", "")}
      />
    </>
  );
}

export default ProjectCard;
